<script>
    import Button from './components/Button.svelte';
    import Header from './Header.svelte';
    import Window from './components/Window.svelte';
    import Datepicker from 'svelte-calendar';
    import {getSessionOrClear, redirect} from './utils.js';
    import {Duration} from 'luxon';

    let error = '';
    let isLoading = false;

    let title = '';
    let date;
    let timeSpent = '';
    let comment = '';

    let session = getSessionOrClear();

    function convertMinutesToDateInterval(minutes) {
        return Duration.fromObject({
            minutes
        }).toFormat("'P'y'Y'M'M'd'DT'h'H'm'M's'S'");
    }

    function handleSubmit() {
        isLoading = true;
        fetch(
            'http://localhost:8080/tasks',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.access_token
                },
                body: JSON.stringify({
                    title,
                    date: date.toISOString(),
                    duration: convertMinutesToDateInterval(timeSpent),
                    comments: comment ? [comment] : [],
                    hash: null
                })
            },
        ).then((response) => {
            if (!response.ok) {
                response.text().then(text => {
                    error = text;
                });

                return;
            }

            redirect('tasks');
        }).finally(() => {
            isLoading = false;
        });
    }
</script>

<Header />

<Window name="Create task">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="title">Title</label>
        <input id="title" name="Title" placeholder="Washing dishes" bind:value={title} />

        <label>Date</label>
        <Datepicker bind:selected="{date}"/>

        <label for="time_spent">Time spent (in minutes)</label>
        <input id="time_spent" name="Time spent" placeholder="15" bind:value={timeSpent} />

        <label for="comment">Comment</label>
        <input id="comment" name="Comment" placeholder="Tom's request" bind:value={comment} />

        <br />
        <Button type="submit">
            {#if isLoading}Submitting...{:else}Submit{/if}
        </Button>

        <br />
        {#if error}{error}{/if}
    </form>
</Window>
