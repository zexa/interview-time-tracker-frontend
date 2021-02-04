<script>
    import Window from './components/Window.svelte';
    import Button from './components/Button.svelte';
    import Header from './Header.svelte';
    import Datepicker from 'svelte-calendar';
    import {getSessionOrClear} from './utils.js';

    let dateFrom;
    let dateTo;
    let format = 'csv';

    let availableFormats = [
        'csv',
        'pdf',
        'xlsx'
    ];
    let error = ''
    let isLoading = false;

    const session = getSessionOrClear();

    function formatDate(date) {
        return date.toISOString().substr(0, 10);
    }

    function handleSubmit() {
        isLoading = true;
        fetch(
            'http://localhost:8080/report?' + new URLSearchParams({
                "date_from": formatDate(dateFrom),
                "date_to": formatDate(dateTo),
                format
            }),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.access_token,
                },
            }
        ).then(response => {
            if (!response.ok) {
                response.text().then(text => {
                    error = text;
                });
            }

            response.blob().then(blob => {
                window.location.assign(window.URL.createObjectURL(blob));
            });
        }).finally(() => {
            isLoading = false;
        });
    }
</script>

<Header />

<Window name="Reports">
    <form on:submit|preventDefault={handleSubmit}>
        <label>Date from</label>
        <Datepicker bind:selected="{dateFrom}"/>

        <label>Date</label>
        <Datepicker bind:selected="{dateTo}"/>

        <label for="format">Format</label>
        <select id="format" bind:value="{format}">
            {#each availableFormats as availableFormat}
                <option value={availableFormat}>
                    {availableFormat}
                </option>
            {/each}
        </select>

        <br />
        <Button type="submit">
            {#if isLoading}Submitting...{:else}Submit{/if}
        </Button>

        <br />
        {#if error}{error}{/if}
    </form>
</Window>
