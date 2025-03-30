export const handleMode = async (mode: string, url: string) => {
  switch (mode) {

    case 'remove_paywall_1':
      await fetchPaywall("https://archive.is/newest/", url, mode);
      return;
      
    case 'remove_paywall_2':
      await fetchPaywall("https://archive.is/oldest/", url, mode);
      return;

    case 'remove_paywall_3':
      await fetchPaywall("https://web.archive.org/", url, mode);
      return;

    case 'remove_paywall_4':
      await fetchPaywall("https://wayback.archive.org/", url, mode);
      return;

    case 'remove_paywall_5':
      await fetchPaywall("https://12ft.io/", url, mode);
      return;

    default:
      console.error("Unknown mode:", mode);
      window.location.href = "/error.html";
  }
};

const fetchPaywall = async (base: string, url: string, mode: string) => {
  try {
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
      sessionStorage.setItem('sessionUrl', url);
	  sessionStorage.setItem('selectedMode', mode);

      //window.location.href = "result";
	  window.location.href = `/result?url=${encodeURIComponent(url)}&mode=${mode}`;
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
    sessionStorage.setItem('sessionUrl', url);
	sessionStorage.setItem('selectedMode', mode);
    //window.location.href = "result";
	window.location.href = `/result?url=${encodeURIComponent(url)}&mode=${mode}`;
  }
};
