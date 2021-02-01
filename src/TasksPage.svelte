<script>
    import Window from './components/Window.svelte';
    import Table from './components/Table.svelte';
    import Button from './components/Button.svelte';
    import {Session} from 'svelte-session-manager';
    import {navigate} from "svelte-routing";
    import Header from "./Header.svelte";

    let columns = [
        {name: "Title", map: "title", type: "String"},
        {name: "Date", map: "date", type: "Date"},
        {name: "Duration", map: "duration", type: "Interval"},
    ];

    let rows = [];
    let page = 0;

    let session = new Session(sessionStorage);
    if (!session.isValid) {
        session.clear();
        navigate('/');
    }

    async function getRows(page) {
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
            rows = await response.json();
        }
    }

    getRows(page);
</script>

<main>
    <Header/>
    <Window name="Tasks">
        <Table {columns} {rows}/>
        <Button>Add new</Button>
    </Window>
</main>
