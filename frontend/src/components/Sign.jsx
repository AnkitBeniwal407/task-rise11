import React from 'react'
import './sign.css'

function Sign() {

    const [signin, setSignin] = React.useState(true)

    return (
        <>
            {
                signin ?
                    <SignIn />
                    :
                    <SignUp />
            }
            {
                signin ?
                    <h1 className="switch" onClick={() => setSignin(!signin)}>Do Not have any Account ? SignUp</h1>
                    :
                    <h1 className="switch" onClick={() => setSignin(!signin)}>Already have an Account ? SignIn</h1>
            }
        </>
    )

}
function SignUp() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then(async (res) => {
            var response = await res.json();
            if (response.status == 'true') {
                localStorage.setItem('token', response.token)
                alert('Account Created Successfully')
                location.reload()
            }else if (response.status == 'duplicate') {
                alert('Account with this email already exists')
            }else {
                alert('Something went wrong')
            }
        })
    };

    return (
        <div className="login-container">
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">SignUp</button>
            </form>
        </div>
    );
}

function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/user/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ email, password })
        }).then(async (res) => {
            var response = await res.json();
            if (response.status == 'true') {
                localStorage.setItem('token', response.token)
                alert('LogIn Successfully');
                location.reload()
            }else if (response.status == 'wrong') {
                alert('Wrong email or password')
            }else if (response.status == 'nouser') {
                alert('User not found')
            } else {
                alert('Something went wrong')
            }
        })
    };
    return (
        <div className="login-container">
            <h2>SignIn</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">SignIn</button>
            </form>
        </div>
    );
}

export default Sign;
