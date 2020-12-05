<script>
    import Window from './components/Window.svelte';
    import Table from './components/Table.svelte';
    import Button from './components/Button.svelte';
    import EmailModal from './components/EmailModal.svelte';

    let columns = [
        {name: "Due Date", type: "Date"},
        {name: "Administrator", type: "Person"},
        {name: "Email", type: "EmailContent"},
        {name: "Status", type: "OrderStatus"},
    ];

    let rows = [
        {
            "Due Date": "2020-12-06 17:30",
            "Administrator": "Kotryna Kybartaite",
            "Email": "?",
            "Status": "Done",
        },
        {
            "Due Date": "2020-12-06 17:30",
            "Administrator": "Kotryna Kybartaite",
            "Email": "?",
            "Status": "Waiting",
        },
        {
            "Due Date": "2020-12-06 17:30",
            "Administrator": "Kotryna Kybartaite",
            "Email": "?",
            "Status": "Due",
        },
    ];
</script>

<Window name="Orders">
    <Table {columns} {rows}/>
    <EmailModal/>
</Window>