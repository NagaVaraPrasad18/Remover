
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { handleMode } from '../utils/action';
import { handleMode2 } from '../utils/action2';

const styles = {
  body: {
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    position: 'relative' as const,
    paddingBottom: '10vh',
  },
  content: {
    paddingBottom: '20px',
  },
  modeSelector: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    width: '100%',
    transition: 'all 0.3s ease',
    height: '10vh',
    display: 'flex',
    flexDirection: 'column' as const,
    zIndex: 998,
    cursor: 'default',
  },
  modeSelectorCollapsed: {
    height: '3vh',
    cursor: 'pointer',
  },
  toggleArrow: {
    position: 'absolute' as const,
    left: '2.5%',
    transform: 'translateX(-50%)',
    top: '-24px',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 997,
    transition: 'all 0.3s ease',
  },
  toggleArrowDark: {
    background: '#1f2937',
    borderColor: '#374151',
  },
  toggleArrowSvg: {
    transform: 'rotate(180deg)',
    transition: 'transform 0.3s ease',
  },
  toggleArrowSvgCollapsed: {
    transform: 'rotate(0deg)',
  },
  formContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
  },
  formGroup: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collapsedHint: {
    display: 'none',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    padding: '0 20px',
  },
  collapsedHintVisible: {
    display: 'flex',
  },
  formContainerHidden: {
    display: 'none',
  },
  buyMeCoffee: {
    position: 'fixed' as const,
    bottom: '50px',
    right: '5px',
    zIndex: 999,
    transition: 'all 0.3s ease',
  },
  buyMeCoffeeCollapsed: {
    bottom: '20px',
  },
};

const ResultPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [content, setContent] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('remove_paywall_1');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const isMobile = window.innerWidth <= 768;

  const contentRef = useRef<HTMLDivElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const modeSelectRef = useRef<HTMLSelectElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const hasRun = useRef(false); // ✅ Track if useEffect has already executed
  const htmlContent = sessionStorage.getItem('htmlContent');

  useEffect(() => {
	if (hasRun.current) return; // Prevent re-running
    hasRun.current = true;

    console.log("useEffect running once!");
	setIsLoading(true);
    // Get theme preference and set dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      setIsDarkMode(savedTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', prefersDark);
      setIsDarkMode(prefersDark);
    }

    // Get data from sessionStorage
    const htmlContent = sessionStorage.getItem('htmlContent');
    const storedUrl = sessionStorage.getItem('sessionUrl');
    const storedMode = sessionStorage.getItem('selectedMode');

    // Also check URL parameters (for direct navigation)
    const urlParams = new URLSearchParams(window.location.search);
    const paramUrl = urlParams.get('url');
    const paramMode = urlParams.get('mode');
	
	console.log("paramUrl: ", paramUrl);
	console.log("paramMode: ", paramMode);
	console.trace(); // Prints stack trace in the console
	
	if (content){
		console.log("Found....");
	}
	else{
		console.log("Not Found....");
	}
	
	console.log("paramUrl: ", paramUrl);
	console.log("storedUrl: ", storedUrl);
	console.log("paramMode: ", paramMode);
	console.log("storedMode: ", storedMode);
	
	const fetchData = async () => {

    if (htmlContent && paramUrl == storedUrl && paramMode == storedMode) {
      setContent(htmlContent);
	  setIsLoading(false);
      console.log('Zoom level:', window.devicePixelRatio);
      console.log('Viewport width:', window.innerWidth);
      console.log('Viewport height:', window.innerHeight);
      //sessionStorage.removeItem('htmlContent');
    } 
	
	else if (paramUrl && paramMode){
		await handleMode2(paramMode, paramUrl);
		const htmlContent = sessionStorage.getItem('htmlContent');
		if(htmlContent){
			setContent(htmlContent);
			setIsLoading(false);
		}
		
	}
	
	else {
      console.error("No HTML content found in sessionStorage.");
    }
	};
	(async () => {
		console.log("Starting fetchData...");
		    await fetchData();
		    console.log("fetchData finished.");
	  })();
	
	const setModeandUrl = () => {
	const storedUrl = sessionStorage.getItem('sessionUrl');
	const storedMode = sessionStorage.getItem('selectedMode');
	const urlParams = new URLSearchParams(window.location.search);
    const paramUrl = urlParams.get('url');
    const paramMode = urlParams.get('mode');

    // Set URL from stored value or URL parameter
    if (storedUrl || paramUrl) {
      const finalUrl = storedUrl || paramUrl || '';
      console.log('url: ', finalUrl);
      setUrl(finalUrl);
    } else {
      console.error("No url content found in sessionStorage or URL parameters.");
    }

    // Set mode from stored value or URL parameter
    if (storedMode || paramMode) {
      const finalMode = storedMode || paramMode || 'remove_paywall_1';
      console.log('selectedMode: ', finalMode);
      setSelectedMode(finalMode);
    } else {
      console.error("No selectedMode content found in sessionStorage or URL parameters.");
    }
	}
	
	setModeandUrl();

    // Disable right-click context menu
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    document.addEventListener('contextmenu', disableContextMenu);
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, [htmlContent]);

  const toggleModeSelector = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollapsed(prev => !prev);
  };

  const handleModeSelectorClick = (e: React.MouseEvent) => {
    if (isCollapsed || (e.target as HTMLElement).tagName.toLowerCase() === 'svg') {
      e.stopPropagation();
      setIsCollapsed(prev => !prev);
    }
  };

  const handleSubmit = async () => {
    if (!urlInputRef.current || !modeSelectRef.current || !submitButtonRef.current) return;
    
    const mode = modeSelectRef.current.value;
    const inputUrl = urlInputRef.current.value;
    console.log('Selected mode:', mode, 'URL:', inputUrl);
	
	window.location.href = `/result?url=${encodeURIComponent(inputUrl)}&mode=${mode}`;
	
	//sessionStorage.removeItem('sessionUrl');
    /*sessionStorage.setItem('selectedMode', mode);
    console.log('selectedMode:----------------- ', mode);
	
	const storedUrl = sessionStorage.getItem('sessionUrl');
	const storedMode = sessionStorage.getItem('selectedMode');
	const urlParams = new URLSearchParams(window.location.search);
    const paramUrl = urlParams.get('url');
    const paramMode = urlParams.get('mode');
    
    const buttonSpan = submitButtonRef.current.querySelector('span');
    if (buttonSpan) {
      submitButtonRef.current.disabled = true;
      buttonSpan.textContent = "Removing...";
    
      const spinner = document.createElement("div");
      spinner.className = "spinner";
      submitButtonRef.current.prepend(spinner);
    }
	
	console.log("paramUrl: ", paramUrl);
	console.log("storedUrl: ", storedUrl);
	console.log("paramMode: ", paramMode);
	console.log("storedMode: ", storedMode);
    
	setIsLoading(true);
	//await handleMode(mode, inputUrl);
	if (htmlContent && paramUrl == storedUrl && paramMode == storedMode) {
      setContent(htmlContent);
	  setIsLoading(false);
	  submitButtonRef.current.disabled = false;
	  buttonSpan.textContent = "Remove Paywall";
      //sessionStorage.removeItem('htmlContent');
    } 
	else if (inputUrl && mode){
		await handleMode2(mode, inputUrl);
		const htmlContent = sessionStorage.getItem('htmlContent');
		if(htmlContent){
			setContent(htmlContent);
			setIsLoading(false);
			submitButtonRef.current.disabled = false;
			buttonSpan.textContent = "Remove Paywall";
		}
		
	}
	else {
      console.error("No HTML content found in sessionStorage.");
    }*/
    
  };

  // Define the Skeleton Loader component
  const ArticleSkeletonLoader = () => {
    return (
		// Main container:
		    // - min-h-screen: Takes at least the full viewport height
		    // - w-full: Takes full width
		    // - relative: Positioning context for the absolute shimmer overlay
		    // - overflow-hidden: Clips the shimmer effect
		    // - bg-white dark:bg-gray-900: Sets a background matching typical page colors
		    // - p-6 md:p-8: Adds padding around the edges
		    <div className="min-h-screen w-full relative overflow-hidden bg-white dark:bg-gray-900 p-6 md:p-8">

		      {/* Inner wrapper:
		          - max-w-3xl: Constrains the width of the skeleton content like a typical article. Adjust as needed.
		          - mx-auto: Centers the constrained content horizontally.
		      */}
		      <div className="max-w-3xl mx-auto">
		        {/* Use slightly lighter grays for base shapes */}
		        <div className="space-y-5 animate-pulse"> {/* You can use pulse *or* shimmer. Shimmer is applied below. If using shimmer, remove animate-pulse here */}

		          {/* Title Placeholder (larger height, more margin) */}
		          <div className="h-8 rounded bg-gray-200 dark:bg-gray-700 w-3/4 mb-6"></div>

		          {/* Text Lines Placeholders (add more lines to fill space) */}
		          <div className="space-y-4">
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-full"></div>
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-5/6"></div>
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-full"></div>
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-full"></div>
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-3/4"></div>
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-full"></div>
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-5/6"></div>
		             {/* Add more blocks if your typical content is longer */}
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-full"></div>
		            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-1/2"></div>
		          </div>
		        </div>
		      </div>

		      {/* Shimmer Effect Overlay (Covers the entire screen) */}
		      {/* Remove animate-pulse from the inner div if using shimmer */}
		      <div
		        className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 dark:via-black/20 to-transparent"
		        style={{
		          backgroundSize: '1000px 100%', // Wide gradient for the shimmer sweep
		        }}
		      ></div>
		    </div>
    );
  };

  return (
    <div style={styles.body} className="bg-background text-foreground">
      <div id="content" style={styles.content} ref={contentRef}>
	  {isLoading ? (
	          <ArticleSkeletonLoader />
	        ) : (
        content && (
          <div dangerouslySetInnerHTML={{ __html: content }} className="article-content" />
        ))}
      </div>

      <div 
        id="modeSelector" 
        style={{
          ...styles.modeSelector,
          ...(isCollapsed ? styles.modeSelectorCollapsed : {})
        }}
        className="bg-background dark:bg-gray-800 border-t border-input dark:border-gray-700 shadow-lg"
        onClick={handleModeSelectorClick}
      >
        <button 
          id="toggleArrow" 
          style={{
            ...styles.toggleArrow,
            ...(isDarkMode ? styles.toggleArrowDark : {}),
            ...(isMobile ? { left: '5%' } : {})
          }}
          className="bg-background dark:bg-gray-800 text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 shadow-lg border border-input"
          onClick={toggleModeSelector}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              ...styles.toggleArrowSvg,
              ...(isCollapsed ? styles.toggleArrowSvgCollapsed : {})
            }}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        
        <div 
          className="form-container" 
          style={{
            ...styles.formContainer,
            ...(isCollapsed ? styles.formContainerHidden : {})
          }}
        >
          <div 
            className="form-group" 
            style={{
              ...styles.formGroup,
              width: isMobile ? '100%' : '60%'
            }}
          >
            <Input
              type="url"
              id="urlInput"
              ref={urlInputRef as React.Ref<HTMLInputElement>}
              placeholder="Enter article URL..."
              style={{
                width: isMobile ? '50%' : 'auto',
                flex: isMobile ? undefined : 3,
                minWidth: 0
              }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-background border-input focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            <select
              id="modeSelect"
              ref={modeSelectRef}
              className="px-4 py-2 rounded-lg bg-background dark:bg-gray-900 border border-input dark:border-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none text-foreground dark:text-white"
              style={{
                width: isMobile ? '30%' : 'auto',
                flex: isMobile ? undefined : 2,
                minWidth: 0
              }}
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <option value="remove_paywall_1">Mode 1</option>
              <option value="remove_paywall_2">Mode 2</option>
              <option value="remove_paywall_3">Mode 3</option>
              <option value="remove_paywall_4">Mode 4</option>
              <option value="remove_paywall_5">Mode 5</option>
            </select>
            <Button
              id="submitButton"
              ref={submitButtonRef as React.Ref<HTMLButtonElement>}
              className="premium-button flex items-center justify-center gap-2"
              style={{
                width: isMobile ? '20%' : 'auto',
                flex: isMobile ? undefined : 1,
                minWidth: 'fit-content',
                ...(isMobile ? { paddingLeft: '8px', paddingRight: '8px' } : {})
              }}
              onClick={handleSubmit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span style={isMobile ? { display: 'none' } : {}}>Remove Paywall</span>
            </Button>
          </div>
        </div>
        
        <div 
          id="collapsedHint" 
          className="text-primary dark:text-primary text-sm"
          style={{
            ...styles.collapsedHint,
            ...(isCollapsed ? styles.collapsedHintVisible : {})
          }}
        >
          Didn't find what you are looking for? Try other modes
        </div>
      </div>

      <Link
        to="/donate"
        id="buyMeCoffee"
        style={{
          ...styles.buyMeCoffee,
          ...(isCollapsed ? styles.buyMeCoffeeCollapsed : {}),
          ...(isMobile && !isCollapsed ? { bottom: '80px' } : {}),
          ...(isMobile && isCollapsed ? { bottom: '30px' } : {})
        }}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-full shadow-lg transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
        <span>Donate</span>
      </Link>
    </div>
  );
};

export default ResultPage;
