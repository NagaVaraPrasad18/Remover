export const handleMode2 = async (mode: string, url: string) => {
	
	sessionStorage.setItem('sessionUrl', url);
	sessionStorage.setItem('selectedMode', mode);
	console.log("This is stored: ", mode);
	
  switch (mode) {

    case 'remove_paywall_1':
      await fetchPaywall2("https://archive.is/newest/", url, mode);
      return;
      
    case 'remove_paywall_2':
      await fetchPaywall2("https://archive.is/oldest/", url, mode);
      return;

    case 'remove_paywall_3':
      await fetchPaywall2("https://web.archive.org/", url, mode);
      return;

    case 'remove_paywall_4':
      await fetchPaywall2("https://wayback.archive.org/", url, mode);
      return;

    case 'remove_paywall_5':
      await fetchPaywall2("https://12ft.io/", url, mode);
      return;

    default:
      console.error("Unknown mode:", mode);
      window.location.href = "/error.html";
  }
};

const fetchPaywall1 = async (base: string, url: string, mode: string) => {
	const startTime = performance.now(); // Start Timer
  try {
	/*sessionStorage.setItem('sessionUrl', url);
	sessionStorage.setItem('selectedMode', mode);
	console.log("This is stored: ", mode);*/
    console.log('Sending Request:', base + url);
    const response = await fetch(base + url, { method: 'GET' });

    if (response.ok) {
      let htmlContent = await response.text();
      console.log("HTML Content:", htmlContent);

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      const baseUrl = new URL(base + url).origin;
      doc.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http')) {
          img.setAttribute('src', baseUrl + src);
        }
      });

      htmlContent = doc.documentElement.outerHTML;
      sessionStorage.setItem('htmlContent', htmlContent);
	  const endTime = performance.now();
	      console.log(`🚀 Total Execution Time: ${(endTime - startTime).toFixed(2)}ms`);
      

      //window.location.href = "result";
	  //window.location.href = `/result?url=${encodeURIComponent(url)}&mode=${mode}`;
    } else if (response.status === 404) {
      window.location.href = "error.html";
      console.log("404 Error");
    } else {
      console.log("Failed to fetch the page. Status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching the URL:", error);
    const iframeHTML = `	<style>
	    body { background-color: white !important; color: black !important; }
	    iframe { background-color: white !important; }
	  </style>
	<iframe src="${base + url}" style="width: 100%; height: 100vh; border: none, background: white;"></iframe>`;
    sessionStorage.setItem('htmlContent', iframeHTML);
	const endTime = performance.now();
		      console.log(`🚀 Total Execution Time: ${(endTime - startTime).toFixed(2)}ms`);
    //sessionStorage.setItem('sessionUrl', url);
	//sessionStorage.setItem('selectedMode', mode);
	//console.log("This is stored: ", mode);
    //window.location.href = "result";
	//window.location.href = `/result?url=${encodeURIComponent(url)}&mode=${mode}`;
  }
};


const fetchPaywall2 = async (base: string, url: string, mode: string) => {
	const startTime = performance.now(); // Start Timer
  try {
	const iframeHTML = `	<style>
		    body { background-color: white !important; color: black !important; }
		    iframe { background-color: white !important; }
		  </style>
		<iframe src="${base + url}" style="width: 100%; height: 100vh; border: none, background: white;"></iframe>`;
	    sessionStorage.setItem('htmlContent', iframeHTML);
		const endTime = performance.now();
		    console.log(`🚀 Total Execution Time: ${(endTime - startTime).toFixed(2)}ms`);
  } catch (error) {
    console.error("Error fetching the URL:", error);
	console.log('Sending Request:', base + url);
	    const response = await fetch(base + url, { method: 'GET' });

	    if (response.ok) {
	      let htmlContent = await response.text();
	      console.log("HTML Content:", htmlContent);

	      const parser = new DOMParser();
	      const doc = parser.parseFromString(htmlContent, 'text/html');

	      const baseUrl = new URL(base + url).origin;
	      doc.querySelectorAll('img').forEach(img => {
	        const src = img.getAttribute('src');
	        if (src && !src.startsWith('http')) {
	          img.setAttribute('src', baseUrl + src);
	        }
	      });

	      htmlContent = doc.documentElement.outerHTML;
	      sessionStorage.setItem('htmlContent', htmlContent);
		  const endTime = performance.now();
		  	      console.log(`🚀 Total Execution Time: ${(endTime - startTime).toFixed(2)}ms`);
	      

	      //window.location.href = "result";
		  //window.location.href = `/result?url=${encodeURIComponent(url)}&mode=${mode}`;
	    } else if (response.status === 404) {
	      window.location.href = "error.html";
	      console.log("404 Error");
	    } else {
	      console.log("Failed to fetch the page. Status:", response.status);
	    }
  }
};


const fetchPaywall222 = async (base: string, url: string, mode: string) => {
	const startTime = performance.now(); // Start Timer
  try {
    const iframePromise = new Promise<string>((resolve) => {
      const iframeHTML = `
        <style>
          body { background-color: white !important; color: black !important; }
          iframe { background-color: white !important; }
        </style>
        <iframe src="${base + url}" style="width: 100%; height: 100vh; border: none; background: white;"></iframe>`;

      resolve(iframeHTML); // Resolve immediately with iframe content
    });

    const fetchPromise = fetch(base + url, { method: 'GET' })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 404) {
            window.location.href = "error.html";
            throw new Error("404 Error");
          }
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const htmlContent = await response.text();
        console.log("HTML Content:", htmlContent);

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        // Fix relative image URLs
        const baseUrl = new URL(base + url).origin;
        doc.querySelectorAll('img').forEach(img => {
          const src = img.getAttribute('src');
          if (src && !src.startsWith('http')) {
            img.setAttribute('src', baseUrl + src);
          }
        });

        return doc.documentElement.outerHTML;
      });

    // Run both and use the one that resolves first
    const fastestResponse = await Promise.race([iframePromise, fetchPromise]);

    sessionStorage.setItem('htmlContent', fastestResponse);
	const endTime = performance.now();
	    console.log(`🚀 Total Execution Time: ${(endTime - startTime).toFixed(2)}ms`);
  } catch (error) {
    console.error("Error:", error);
  }
};