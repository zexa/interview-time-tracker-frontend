<script>
    import Window from './components/Window.svelte';
    import Table from './components/Table.svelte';
    import Button from './components/Button.svelte';
    import Header from './components/Header.svelte';
    import NavLink from './components/NavLink.svelte';
    import {getSessionOrClear} from './utils.js';

    const columns = [
        {name: "Title", map: "title", type: "String"},
        {name: "Date", map: "date", type: "Date"},
        {name: "Duration", map: "duration", type: "Interval"},
        {
            name: "Comment",
            map: "comments",
            type: "String",
            handler: comments => {
                comments.length > 0 ? comments[0] : ''
            }
        }
    ];

    let rows = [];
    let page = 0;
    let pageSize = 50;
    let error = '';

    const session = getSessionOrClear();

    let isPageChanging = false;

    function previousPageHandler() {
        if (isPageChanging) {
            return;
        }

        isPageChanging = true;
        if (page > 0) {
            page--;
            getRows(page).then(() => {
                isPageChanging = false;
            });
        } else {
            isPageChanging = false;
        }
    }

    function nextPageHandler() {
        if (isPageChanging) {
            return;
        }

        isPageChanging = true;
        if (rows.length >= pageSize) {
            page++;
            getRows(page).then(() => {
                isPageChanging = false;
            });
        } else {
            isPageChanging = false;
        }
    }

    async function getRows(page) {
        const response = await fetch(
            'http://localhost:8080/tasks?page=' + page,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.access_token
                },
            }
        );

        if (!response.ok) {
            error = await response.text();
        }

        rows = await response.json();
    }

    getRows(page);
</script>

<main>
    <Header/>
    <Window name="Tasks">
        {#if isPageChanging}
            Changing page...
        {:else}
            <Table {columns} {rows}/>
        {/if}

        <br />
        <NavLink to="createTask">
            <Button>Create task</Button>
        </NavLink>

        <br />
        <br />
        Page: {page}
        <br />
        <Button inline on:click={previousPageHandler}>Previous page</Button>
        <Button inline on:click={nextPageHandler}>Next page</Button>
        <br />
        {#if error}{error}{/if}
    </Window>
</main>
