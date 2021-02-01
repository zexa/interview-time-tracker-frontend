<script>
    export let columns = [];
    export let rows = [];
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
