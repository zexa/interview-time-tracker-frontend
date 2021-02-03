<script>
    import Window from './components/Window.svelte';
    import Button from './components/Button.svelte';
    import Header from './Header.svelte';

    let dateFrom = '';
    let dateTo = '';
    let format = '';

    let error = ''
    let isLoading = false;

    function handleSubmit() {

    }
</script>

<Header />

<Window name="Reports">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="dateFrom">Date from</label>
        <input id="dateFrom" name="Date from" placeholder="2021-01-28T00:00:00+00:00" bind:value={dateFrom} />

        <label for="dateTo">Date</label>
        <input id="dateTo" name="dateTo" placeholder="2021-01-28T00:00:00+00:00" bind:value={dateTo} />

        <label for="format">Format</label>
        <input id="format" name="Format" placeholder="csv" bind:value={format} />

        <br />
        <Button type="submit">
            {#if isLoading}Submitting...{:else}Submit{/if}
        </Button>

        <br />
        {#if error}{error}{/if}
    </form>
</Window>