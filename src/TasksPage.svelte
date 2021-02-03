<script>
    import Window from './components/Window.svelte';
    import Table from './components/Table.svelte';
    import Button from './components/Button.svelte';
    import {Session} from 'svelte-session-manager';
    import {navigate} from "svelte-routing";
    import Header from "./Header.svelte";
    import CreateTaskModal from "./CreateTaskPage.svelte";
    import {getContext} from "svelte";
    import NavLink from "./components/NavLink.svelte";

    let columns = [
        {name: "Title", map: "title", type: "String"},
        {name: "Date", map: "date", type: "Date"},
        {name: "Duration", map: "duration", type: "Interval"},
    ];

    let rows = [];
    let page = 0;
    let pageSize = 50;
    let error = '';

    let session = new Session(sessionStorage);
    if (!session.isValid) {
        session.clear();
        navigate('/');
    }

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
        console.log("Getting rows with page ", page);
        const response = await fetch(
            'http://localhost:8080/tasks?page=' + page,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.access_token
                },
            }
        );
        if (response.ok) {
            console.log("We got the rows");
            rows = await response.json();
        } else {
            console.log("Something went wrong while getting rows...");
            error = await response.text();
        }
    }

    getRows(page);
</script>

<main>
    <Header/>
    <Window name="Tasks">
        <Table {columns} {rows}/>

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
