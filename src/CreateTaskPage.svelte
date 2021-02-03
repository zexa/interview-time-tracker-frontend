<script>
    import Button from './components/Button.svelte';
    import {Session} from 'svelte-session-manager';
    import Header from './Header.svelte';
    import {redirect} from "./utils";
    import Window from './components/Window.svelte';
    import Datepicker from 'svelte-calendar';

    let error = '';
    let isLoading = false;

    let title = '';
    let date = '';
    let timeSpent = '';
    let comment = '';

    let session = new Session(sessionStorage);
    if (!session.isValid) {
        redirect('/');
    }

    function handleSubmit() {
        isLoading = true;
        fetch(
            'http://localhost:8080/tasks',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.access_token
                },
                body: JSON.stringify({
                    title,
                    date,
                    duration: timeSpent,
                    comments: [comment]
                })
            },
        ).then((response) => {
            if (response.ok) {
                close()
            } else {
                error = response.text();
            }
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
<!--        <input id="date" name="Date" placeholder="2021-01-28T00:00:00+00:00" bind:value={date} />-->
        <Datepicker/>

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
