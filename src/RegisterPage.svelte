<script>
    import Button from "./components/Button.svelte";
    import NavLink from "./components/NavLink.svelte";
    import jwtDecode from "jwt-decode";
    import {Session} from 'svelte-session-manager';
    import {navigate} from "svelte-routing";

    let username = '';
    let password = '';
    let isSuccess = false;
    let isLoading = false;
    let error = '';

    let session = new Session(sessionStorage);
    isSuccess = session.isValid;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function redirect() {
        await sleep(1000); // After initial page render navigate won't draw the next view without this sleep.
        navigate('/tasks');
    }

    async function register(session, endpoint, username, password) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": username,
                    password
                })
            });
            if (response.ok) {
                const data = await response.text();
                const token = jwtDecode(data);

                session.update({
                    username,
                    access_token: data,
                    expirationDate: token.exp,
                });
                session.save();
            } else {
                error = await response.text();
            }
        } catch (e) {
            throw e;
        }
    }

    function handleSubmit() {
        error = '';
        try {
            isLoading = true;
            register(
                session,
                'http://localhost:8080/register',
                username,
                password
            ).then(() => {
                isLoading = false;
                if (error === '') {
                    isSuccess = true;
                }
            });
        } catch (e) {
            isLoading = false;
        }
    }
</script>

<style>

</style>

<form on:submit|preventDefault={handleSubmit}>
    {#if isSuccess}
        <div>
            You've been successfully registered. Redirecting...
            {#await redirect()}{/await}
        </div>
    {:else}
        <h1>Registration</h1>

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