<script>
    export let columns = [];
    export let rows = [];

    const applyHandlers = () => {
        for (const column of columns) {
            for (let row of rows) {
                if (column.handler) {
                    row[column.map ?? column.name] = column.handler(row[column.map ?? column.name]);
                }
            }
        }
    };

    applyHandlers();
</script>

<table>
    <thead>
        <tr>
            {#each columns as column}
                <th>{column.name ?? column.map}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each rows as row}
            <tr>
                {#each columns as column}
                    <td>{row[column.map ?? column.name]}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
