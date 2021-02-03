<script>
    import Button from './components/Button.svelte';
    import NavLink from './components/NavLink.svelte';
    import {Session} from 'svelte-session-manager';
    import jwtDecode from 'jwt-decode';
    import {redirect} from './utils';
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
            'http://localhost:8080/login',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        ).then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    response.json().then(errData => {
                        error = errData.message;
                    });

                    return;
                }

                response.text().then(text => {
                    error = text;
                })

                return;
            }

            response.json().then(data => {
                if (!data.token) {
                    error = 'Unexpected response';
                }

                const token = jwtDecode(data.token);
                session.update({
                    username,
                    access_token: data.token,
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

<Window name="Login">
    <form on:submit|preventDefault={handleSubmit}>
        {#if isSuccess}
            <div>
                You've been successfully logged in. Redirecting...
                {#await redirect('tasks')}{/await}
            </div>
        {:else}
            <label for="username">Username</label>
            <input id="username" name="username" placeholder="name@example.com" bind:value={username} />

            <label for="password">Password</label>
            <input id="password" name="password" type="password" bind:value={password} />

            <br />
            <Button type="submit">
                {#if isLoading}Logging in...{:else}Log in{/if}
            </Button>

            {#if error}{error}{/if}

            <br />
            <NavLink to="register">Don't have an account yet?</NavLink>
        {/if}
    </form>
</Window>
