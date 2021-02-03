<script>
    import Button from "./components/Button.svelte";
    import NavLink from "./components/NavLink.svelte";
    import jwtDecode from "jwt-decode";
    import {Session} from 'svelte-session-manager';
    import {redirect} from './utils.js';
    import Window from "./components/Window.svelte";

    let username = '';
    let password = '';
    let isSuccess = false;
    let isLoading = false;
    let error = '';

    let session = new Session(sessionStorage);
    isSuccess = session.isValid;

    function handleSubmit() {
        error = '';
        isLoading = true;
        fetch(
            'http://localhost:8080/register',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": username,
                    password
                })
            }
        ).then((response) => {
            if (!response.ok) {
                response.text().then(text => {
                    error = text;
                })

                return;
            }

            response.text().then(data => {
                const token = jwtDecode(data);
                session.update({
                    username,
                    access_token: data,
                    expirationDate: token.exp,
                });
                session.save();
                isSuccess = true;
            });
        }).finally(() => {
            isLoading = false;
        });
    }
</script>

<style>

</style>

<Window name="Register">
    <form on:submit|preventDefault={handleSubmit}>
        {#if isSuccess}
            <div>
                You've been successfully registered. Redirecting...
                {#await redirect('tasks')}{/await}
            </div>
        {:else}
            <label for="username">Username</label>
            <input id="username" name="username" placeholder="name@example.com" bind:value={username} />

            <label for="password">Password</label>
            <input id="password" name="password" type="password" bind:value={password} />

            <br />
            <Button type="submit">
                {#if isLoading}Registering...{:else}Register{/if}
            </Button>

            {#if error}{error}{/if}

            <br />
            <NavLink to="/">Already have an account?</NavLink>
        {/if}
    </form>
</Window>
