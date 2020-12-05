<script>
	import Header from './Header.svelte';
	import Orders from './Orders.svelte';
</script>

<main>
	<Header/>
	<Orders/>
</main>

<style>
	/* vietnamese */
	@font-face {
	  font-family: 'Mulish';
	  font-style: normal;
	  font-weight: 400;
	  src: local('Mulish Regular'), url(https://fonts.gstatic.com/s/mulish/v1/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aivG4w-.woff2) format('woff2');
	  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
	}
	/* latin-ext */
	@font-face {
	  font-family: 'Mulish';
	  font-style: normal;
	  font-weight: 400;
	  src: local('Mulish Regular'), url(https://fonts.gstatic.com/s/mulish/v1/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8amvG4w-.woff2) format('woff2');
	  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}
	/* latin */
	:global(@font-face) {
	  font-family: 'Mulish';
	  font-style: normal;
	  font-weight: 400;
	  src: local('Mulish Regular'), url(https://fonts.gstatic.com/s/mulish/v1/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aevGw.woff2) format('woff2');
	  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	:global(:body) {
		font-family: 'Mulish', sans-serif;
		font-weight: 500;
	}

	:global(:root) {
		font-family: 'Mulish', sans-serif;
		--background-color: #F7F8FC;
		--background-color-2: #F2F3F6;
		--background-color-3: #DAE1F5;
		--foreground-color-1: #545D7A;
		--foreground-color-2: #6A6E79;
		--shadow-color: #979797;
		--spacing-1: 8em;
		--spacing-2: 4em;
		--spacing-3: 2em;
		--spacing-4: 1em;
		--header-icon-size: 1.5em;
		--header-icon-spacing: 1.5em;
	}

	main {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background: var(--background-color);
	}
</style>