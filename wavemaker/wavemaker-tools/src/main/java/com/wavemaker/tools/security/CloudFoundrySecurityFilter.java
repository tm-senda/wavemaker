
package com.wavemaker.tools.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import com.wavemaker.tools.cloudfoundry.CloudFoundryUtils;
import com.wavemaker.tools.cloudfoundry.spinup.authentication.SharedSecret;
import com.wavemaker.tools.cloudfoundry.spinup.authentication.SharedSecretPropagation;
import com.wavemaker.tools.cloudfoundry.spinup.authentication.TransportToken;
import com.wavemaker.tools.cloudfoundry.spinup.authentication.TransportTokenDigestMismatchException;

/**
 * A servlet {@link Filter} that implements Security on cloud foundry.
 * 
 * @see LocalSecurityFilter
 * @author Phillip Webb
 */
public class CloudFoundrySecurityFilter implements Filter {

    private static Log log = LogFactory.getLog(CloudFoundrySecurityFilter.class);

    private SharedSecretPropagation propagation = new SharedSecretPropagation();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException {
        try {
            if (isSecurityEnabled()) {
                checkAuthenticationCookie(request);
            }
            chain.doFilter(request, response);
        } catch (Exception e) {
            if (log.isInfoEnabled()) {
                log.info("Redirecting to spinup following security error", e);
            }
            redirectToSpinup(response);
        }
    }

    private boolean isSecurityEnabled() {
        return Boolean.valueOf(CloudFoundryUtils.getEnvironmentVariable("check_wavemaker_credentials", "true"));
    }

    private void checkAuthenticationCookie(HttpServletRequest request) throws TransportTokenDigestMismatchException {
    	Cookie[] allCookies = request.getCookies();
		Assert.state(allCookies.length < 12, "Way too many auth cookies.");
    	Cookie[] authCookies = new Cookie[allCookies.length];
		int num = 0;
    	for(Cookie cookie: allCookies){
    		if(cookie.getName().equals("wavemaker_authentication_token")){
    			authCookies[num++] = cookie;
    		} 	
    	}
    	for(Cookie cookie: authCookies){
    		try{
    			Assert.state(cookie != null, "This is no cookie");
    			Assert.state(StringUtils.hasLength(cookie.getValue()), "This cookie has no value");
    			log.debug("Trying = " + cookie.getValue());
    			SharedSecret sharedSecret = this.propagation.getForSelf(true);
    			sharedSecret.decrypt(TransportToken.decode(cookie.getValue()));
    			return;
    		}
    		catch(TransportTokenDigestMismatchException ttdme){
    			log.debug("Invalid cookie");
    		} 		
    	}
		log.warn("NO valid cookie - redirecting " + request.getRequestURI() + " to spinup app");
    	throw(new TransportTokenDigestMismatchException("Unable to find valid secret token"));
    }

    private void redirectToSpinup(HttpServletResponse response) throws IOException {
        String controllerUrl = CloudFoundryUtils.getControllerUrl();
        String spinupUrl = controllerUrl.replace("api.", "WaveMaker.");
        response.sendRedirect(spinupUrl);
    }

    @Override
    public void destroy() {
    }

    public void setPropagation(SharedSecretPropagation propagation) {
        this.propagation = propagation;
    }
}
