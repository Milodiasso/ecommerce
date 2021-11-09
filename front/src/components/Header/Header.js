import React, { useState, useEffect } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import GoogleLogin from 'react-google-login';
import { NavLink, useLocation } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import InscriptionForm from '../Form/InscriptionForm.js'
import ConnexionForm from '../Form/ConnexionForm.js'
import Panier from '../Pages/Panier/PanierContenu.js'
import Caroussel from "./Caroussel.js"
import Search from './Search.js';

const axios = require('axios')

const Header = (props) => {

    const location = useLocation();

    const [showMenu, setShowMenu] = useState(false);
    const [showPanier, setShowPanier] = useState(true);
    const [showI, setShowI] = useState(false);
    const [showC, setShowC] = useState(false);
    const [nameclass, setnameclass] = useState('Bandeau-container');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState('');


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/promotion")

            .then((res) => (setPromotion(res.data[0])))
    }, [])

    useEffect(() => {
        if (token) {
            axios.post("http://127.0.0.1:8000/api/decode", { token: token })
                .then((res) => (setUsername(res.data.username)))

        }

    }, [username])

    const onClick = () => {
        setShowMenu(!showMenu);
        setShowC(!showC);
    }
    const ouvrirPanier = () => {
        setShowPanier(!showPanier);
    }
    const toggleC = () => {
        setShowI(false);
        setShowC(true);
    };
    const toggleI = () => {
        setShowI(true);
        setShowC(false);
    };

    const [connexion, setConnexion] = useState(false);
    const [donnesUtilisateur, setDonnesUtilisateur] = useState();

    const [titre, setTitre] = useState('LorraineTech');
    const [promotion, setPromotion] = useState([])





    useEffect(() => {
        switch (location.pathname) {
            case '/profil':
                setTitre("LES INFORMATIONS DE VOTRE COMPTE")
                setnameclass("Bandeau-Articles")
                break;
            case "/articles":
                setTitre("NOS MEILLEURS ARTICLES DE LORRAINE TECH")
                setnameclass("Bandeau-Articles")
                break;
            case "/promo":
                setTitre("NOS PROMOTIONS DU MOMENT")
                setnameclass("Bandeau-Articles")
                break;
            case "/panier":
                setTitre("VOTRE PANIER")
                setnameclass("Bandeau-Articles")
                break;
            case "/apropos":
                setTitre("À PROPOS DE LORRAINE TECH")
                setnameclass("Bandeau")
                break;
            case "/contact":
                setTitre("CONTACT")
                setnameclass("Bandeau")
                break;
            case "/":
                setTitre("BIENVENUE SUR LORRAINE TECH, LA POINTE DE L'INNOVATION TECHNOLOGIQUE")
                setnameclass("Bandeau")
                break;

            default:
                setTitre("LORRAINE TECH VOUS PROPOSE")
                setnameclass("Bandeau")
                break;
        }
    }, [connexion, donnesUtilisateur, location])

    const responseGoogle = (response) => {
        if (!response.error) {
            alert('Connexion réussi');
            setConnexion(true);
            setDonnesUtilisateur(response);
        } else {
            alert('Une erreur est survenu')
        }
    }

    function logout() {
        localStorage.clear('token');
        setInterval(() => {
            window.location.reload(false);
        }, 2000);
    }



    return (
        <div>
            <header>
                <nav>
                    <div className="left">
                        <div>
                            <NavLink to="/"><img alt="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADeElEQVRoge2YWWgUSRjHf9NHBuMRjYiKwcQwKuoSL1BRwXsV7wdxWZYFURYVfRAVMeD1ZkSIJ/jgAa5vsri7IIoniqBiVJJdwTseKB6sWc/R6Ul1+9BxekbTPTNJ1agw/6eeqf6+ql9VdX1/CvLKK6+8vqZCQY2R7dESYYotOEwG2rekgzZGiPKOGj/20pnR28DQ3P/fWg4LjsR48tb2C33jwAlNs1fXLyq6nTVAZHu0RBiiDihuycCbU99ijapxYTq3cbu9+tRm2ckP6cIa4iG94tHiwsfNNWp+UcIUW5A4eICbDTaVZ2KIpkkf0k1jYFc9XVixaYtqv0ZfgKZtE6j5FWa6V77QjRc2h+82Jn5PLE0LACH/sfgDZLDn51WY/DYoe4jj90TieWDXoCEkVOTXkFF0kH79wWTJ0IKsYur/9z7cLoWB50hatRoA4Kd+BkuzgHgXdxLPbc1vAABgbj+D5cMKgs9lBZIGADC7j8GK4QVoOaSQCgAws7fByhxCSAM4+9A7WaZHcgchDWDDuVjK8Tg9YrB2VBhd+hqnSlp64cDG8zGO1nsQE8p01oxUCyE1tXBg04UYR5Mq7YQyXelKSE9rO1B1weLPmx7E+FKd9YoglMyLA2ytsfj7lgcxtlRnw+iw9L6kAywc7HojB6i+ZHHwhgcxpmcGxi1LSQf4ZYDJ4iEexM7LFgf+jcvuJiElW+jn/iZLh3q2YnddnP2KIAwlWXG9kabBjhoLB9hbpwZA+gokV+Q5fVMNngoI6QCfV+RZfQxWjVBnK6QDfKrIx5IgpkUM1nxPdUA4UPWZrZioyFYocyl+tmKd5JVQdgqBays2XbQQjutOAcaV6mgheRVZsdl1ITZftDh0S01FVg4AbkXedsnijySDJ0s5AQAXYkdNqjeSoZwBgOeNDl6XB9EqgGjS/U5hFvc7O69Y/C7JG7UK4HnUAygvyi7Vnro4B661HiLoGH0NdAgKrn1mU9Y08Em9dK79J4Je/0K7a+OJm+o0euXX4DttDpxMl/X0g9RbiEin7Bd03z8ZrEKIE35Nvj1qtlMJvAjKW/tMcPWpO4WmDlVjw5S3ACKNGjTbrvRrDPzySnZFe5i2qCbEFHy2U/d2GnunhmlX4KaKC/jrdiOn7gvuvbR53+g0F5aJXhPiuGbblXeXFN1paZK88sorL7X6CO2mGlYpJesDAAAAAElFTkSuQmCC" /></NavLink>
                        </div>
                        <div>
                            <NavLink to="/promo"><img alt="promotion" title="Promotions" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAGtElEQVRoge2ZbXCUVxXHf+c+u0s2m4ROpyjtqFOHoRDS0lFIMuFFCZvY6YvQOhNqLDaUqaSUzjCA0xn7iU91HKd0rC3iaKFUGSxWp1SnaAkpOimQDQ2ivASxHXTqtBbkJdnNht089/hh855n2X1CtjpO/592z7nnnP/Ze+/z/O9d+AT/x4gvrf52PFq5qZA1pFCJe6LVXxd0FyAIq0paYi8Xok5BGuiJVtcKug+YMmBKI3y1pCX2+8mu5buB3q9UftZ15aAgv7XCL0sXtR+SzdhBf7yu5g7U/SNww5jQHlGzJNJ6pHOUsbayAkcaRGkwrtxVfLD9/YI20FNXuUJUXhlh+kDhdUFfs449Z1znLWB6lvAPrePWGtfcqsj9AsuAmwedKvpgaUvHHj98An4bEGXBGNPNAs0gzcZ1coVPN65zGrx/OYEawFcDxs/ggZAa/zH5Qnzn9rWEtKYmnCh2LwMhv4XyRDrS60yVw4eT+Qb4moGeiJ1H4cgDBHuK0l/0E5DXHtAlS4p6JD7PoI9PjFf+MI5Z1107n1IteUcOHuzLNd5zCSXqF96Cm5qnRhaKlUUqOg8omnS210Y/8FdF20Tk7QDaVtTS8d7YQZ4zoDbdisgsFFS04EyzIADMEWQOypp+NV1AudcgL+wFnsyniplxG6GmNZjb54Ja7JnTpH6+HXvqLxOn7llI93qavYxWvQePC66YS/j5F3EWLEaKi5FIKU7VAsJbfoSpmDs+IBhCyqb6oT1cS8m/gdIvdRwBPsyVNPTIYxAM4R7roPeBenofqMM91gGBIKGmb40bH2x8mPDOVwksrvXL/6Pw4lh73g0MaJs3cmU1s+YAkN6zC00m0WSS9J5dGV/5HaPHfuZzhBqbkJIS7PmP/NGH34zUW6PyZosQa3IuIwmHAdArl4Zsg58HfYMIrX8SgiHSe3+F7TqZD+nhOtdY0lkbUKPnciXWK5czBW64cbhYWUaEam/vkC1QfzfOFyrRixdI79iWD+fRdcT8PZvPs4FEfdV80P25EtuTmSdN8BurkGmfRm6aRrCxKeMbeApJaRmh5vUApF54Fk3E/fIHtLU3WuWpk8a9yOL1lVGs/Booy5XWzJhJ+IfbITRGXaRSJDc0Y8+cYsrGpwjcsxw3doi+pzZMgPwQEqK2IdJ6dN8oDqPIRysfwsq+fMgD2HfPkty0FrczBn1J9PIl3Lf/QHLtw9gzp3Buv5PA3cvgah9Xn/v+9ZAHiKiY1xN11atHGodmIB6tXg+6ZWxTE4bjEN66EzNjJqmfbiX9i52TkhZQlO+UtMa+B5NF1gPBFSsxM2Ziz71H+tVdhSozeg/Eo5UPgewAgteVdPotFL+4G0JT6NvQjHviOGZ2BaFvPoqZXY5MKcI9fZLUjm1+JUe/iDRHWtq3ezYA/jZxNhQ9/SxO1QL639jL1S1PY8orCD+zbfxmT6dIPrEa++7ZfNLm3sQAJfs7DoghCvh+XQIEvlyHU7UAvXyJ1E+eBwYkRyiEe+wovSvupbdxGe6J4xAMEWpak0/afxuoH0veswGAyP7YUZB6v+QlUkJoXeZRmfrxD9CebgCcORlZkX7lZfTiBfT8v0jvfilDwEv0jc+8tPhA7LCXJ7uUED7viz0QXL0WufEm3D930t/yu2FH0YDk6L4yZNJLFzN1po69PvLgYuXWbL7sUgK7PDflEYlmVxBc9jVIp0ht+S7oiINQX+aMPigzYFh+jJQcWbmY7Fw8G9DNGFTuyY/6QKJpn0LjcVK7d2Lf/8con3s6I96CD65EwmGkOEJwxUoAbNeJfNLfpw0NnpdOnmfi7tr5C40xbT74Z5KVTUWTSUinRtmdijspemYrBALQ3w8oBIIZybHpMezp3OrUqi4sa+04NNbuOQPGGF/LZxDafWUceQD35HH6Nj2O23EYTfSgiURGcjzxSF7kAYyIJyfPGYhHq7qAWT64fxw4W3IgdttYo+ehXkxw6f/itYrXoLyuFocuthyzDqVxUmmOZ7TbuvaF67rYyoaJbm4/yLZZs8GXGi0tunwUuOqbVf5IldpIZ+5hw/DVgOz721WEP/njlD8UOvNZNiMxgfOAemqSyYAovnP7bkAZV+QCws9EdZl13HLgg2sEn7eOW25FFoM8B/wzR+6c8P0Xk2M4bPulC6N7DfJaeFF7bOSlU6Ju/r2q5iDjzxPdYuxdZW++0zXwvU03syHZVl1l0fuxstwJ2CN++Xx8f7Oq3FfS2v7mZNcqyJm49ED7W4qsAiygCI8WgnzBEY9WbYxHqzb+t3l8gkLiPxbjc3G0ryykAAAAAElFTkSuQmCC" /></NavLink>
                        </div>
                        <div>

                            <button onClick={ouvrirPanier}>
                                {props.compteur ? <div className="compteur">{props.compteur}</div> : ''}
                                <img alt="panier" title="Panier" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAC9UlEQVRYhc2Y3YtVZRSHn1X5MSoSRBfKpKQgXelFUF3lkDiCEF6IQf0DQgrmveA/4JXgTQaFXqTCMEhemBc2UpgiOEpSUOaNImpi48cM4pRPF/s9sWfcZ2af/THODw7nvGutd+3nvGvtfd7zwjxXqK8DHwN9Bf5x4GpEXJtbrJzUC86uU+rSl8EX6n3gjTTeCtzL+ZcD24FdwJcRsXOO+UDdpv6g7p0h5oQ6qa4omTOaIyx3wY9SqT8vEfuW+qt6Ul2cs4d6QL2tvt804CJ1Qj0+S9wq9c9c755W+5JvX84+1gbkWfVut/KllbtecIOdUfvUfvWPnP2h+kGTgPtT4ncKfKu6wHV0Tl1aAPlE/bApwIGUdOc0+/SyzgS5rAvkxm7XLX23mTX838BwRHyWs28BVpdMcykiRtV+skdaR4+BYxFhWZ5ukCPq7VpJetQrPcaPACtKlLOunqkDVQDP9RhfVQuAMeihB2FKHy6eLbamfomI9dDjCkbEU+BSK0hT9VXnQ68lhvbL/Az4tjOYj4DfRcRfnUEVwPNk37ItfZMf9AwYERO014d3ge/zhiorCO2V+UhETOYN8w3w6HRDpZ2vuoTsebiwLlFOFyPihe1XpRVMfXi5NtJUfV1krFpiyH6Xm9JToHC3XgewyT4cjoixIkcdwJ+AyVmjyqmwvFADMCKeAKNV5+d0CzjbzflazeQjwHvAb8BEhfkCByPi35ocXbLr1rTB/LSVC1CvBwF+BP4BBhpgaUfqRfVGW/nrriDASeBtdVMDuV5Q7UMe9U3gGtn54mHgBr09fp4DpyLiTl2WrlI3qDdr/Is71BpcAlypjqtX1M3qbrPjuvPqu9NePyffbnUwzRm35NFeVcBP0koM5mxD6qOC2EfqUG68Jc3dUZS7iZsE4H56X5cu+iqwFijqq3vAmhTz/5xcjualLlSvptINpbKp7imI3Zt8V1LspDqqNrm3LIRcqR5XH6i/q3ssOEs0O2n9wuyE64F6bKb++w/ntlgbrMp+awAAAABJRU5ErkJggg==" />
                            </button>
                        </div>
                    </div>
                    <Search/>
                    <div className="right">
                        <div>
                            <NavLink to="/apropos"><img alt="A propos" title="A propos" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAACFUlEQVRYhe2YzUtVQRiHfycCFeTmRrhRCwtspxltCiLQrX+A9GckLdoKURmtBcG2Ea77WGW08W4Eb7hXsYJoVXovpC6eFufcPM6dc52Z81HBfeDAYc6873nOx7zMjNSnz98lCg0EapJmJc1Iui5pTNJIcvmHpF1JTUlrkt5EUXSQT9Vd7BrwAmjjThtYAcbLFBsCngPHHmImR8AzYLBouXFgK4eYSQO4WJTcDeB7gXIdPgOTRby5MuTSkvVQuUGgWaJchw1gKMvjXA/HR4rLhyvfJN2XNJ+cu3JT0kOP/n9Kie9ovZOKv+sZe4DPpyauc77UUvEXAuKXXOVq+BXhDvOpHA8C4lvAsIvgvYDkHRrJEcqc6WMbJDNOr9rOreQIpeveNkGfkVs0XYX7vKXTlcDkXyQ1kvPbki4H5Lh6Zg/gMPD/WU3lWA3M8cv06VWo/wlsgvuVW5zw02ywCe5UIJLFttlgE2xWIJLFJ7PBJrhWgUgW780Gm+BrSe3yXbpoS3pnNnYJRlHUkvSqCiODl8m9T5FVZhYlHZfrc4ojSU+9IohXX1XxxPuRiKf8eWYmrqwDA96CiWQd2CtR7itwKUguJTlJvPoqmj1gIpdcSnIU+Fig3Dqhy80ekgPAAvHUPJRD4DGh/5yjaB1Y8hRtAcvA2fM9gzzbb8OKt9+mJU0pnuimt992JG1K+iDpra0I9+nzP/Abmfv7NsZRqr8AAAAASUVORK5CYII=" /></NavLink>
                        </div>

                        <div>
                            <button onClick={onClick}>
                                <img alt="user" title="connexion/inscription" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAADFElEQVRYhe2Y3YuUZRjGf7er7m6ZgZRJkW6eyEqwhQpGetBB53YgIqgRgXoi6En/QAR9/AVbGImdRIjVSUZF4IYZGiSCuFqkuZhfrFmZNeX+PHifkRFn33nmnZn1xAuGYd7nvu7r4n6fj/sZuI/OEFVI6kPAUPr0AWeA4xFxs4veKhlbp46pN70bZ9V13dbMqqDaD+wBNgCTwEfAceAcMAUMA9uApcAHwO6I+K7bZssMvpeqNKoOTBOzQP1UvZ5i35gpcyPqlLo/M36e+nkyubrX/lBfT2LL2+AsTJX8uJfe6mJj6i8VeF+oE53qz8qIeQw4WyH3T8AT6pwK3NvIMTgIXO9Ao9JeW0eOwUlgQYXci4BrEVGrwL2N2Rkx54HsBdKAYWC8/kNdAjxSIU851DfTKn60Dc7CtDW90/BstMnp0xI5FTyTvlcABzI9vkgx9441PPsQ+CGTnw/1kHpJHWqDs1L9Xd3XdUNNxM6pX1bgHVG/71Q/ZxX/CKxSn8xNqj5FsbBOVTWWDfUFtZYmfX9G/ONpftfUtZ3qt1wkEfGNug14H3gWONyC8nz6Xh8RY+owsLeqwZxXDPAVRd/3ckbsJoqT5+uqpipB/Uz9V326JGZtmgqjM+mtLr5MvaaOl8RcVn9TF3VLN/cVExHjFBvtYElYH3AwIi50aqyObIMJc1uM14CWK70d5Bx1jRgE/iwZrwHzmg2kLWe4Tb18qJvTAthdEvOJxZV0Y5OxSs1Cy2bS4uLzGvASRZe8JiIuThO7GDgILAH2A29HxOE01r12S+1Xt6TzVPX/VIH5GdyH1XcTR/Wo+orTXFfbNTag7lAnUvIr6lvtdDINuYYsesnLKdd5dadatguUJnxGPZmSnVJfrZzszrwDqYL13KfVFe0mWaX+of6tblf7OjXWRKNP3Zo0/lKfyyU+oP5qcUqMdNtYE72RpDWhPphD2JlKv7XX5ho0tyfNXTnB36o31KYbbC9g8f/NDXWsVWyoVymOpxO9t3YHlgP/RETpnXs28PPM+LkLJwDUORHx3z3ycB/3HrcAfETdqr+G1XMAAAAASUVORK5CYII=" />
                            </button>
                        </div>

                        <div>
                            {username ?
                                showMenu &&
                                <div className="zoneCompte">
                                    <div className="IC"> <span className="hello"> Bonjour {username} </span>
                                        <a href="/profil"> <button className="btn info">Mon compte</button> </a>
                                        <button className='btn-danger' onClick={logout}> Déconnecter</button>
                                    </div> </div> :
                                showMenu &&
                                <div className="zoneCompte">

                                    <div className="toggleIC">
                                        <button onClick={toggleC}>Connexion</button>
                                        <button onClick={toggleI}>Inscription</button>
                                    </div>

                                    <div className="IC">
                                        <div className="inscription">
                                            {showI ? <InscriptionForm /> : ''}
                                        </div>
                                        <div className="connexion">
                                            {showC ? <ConnexionForm /> : ''}
                                        </div>

                                        <GoogleLogin
                                            clientId="977932900483-7untrotisikvc62qmoikk0r9dethp5vc.apps.googleusercontent.com"
                                            render={renderProps => (
                                                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                    <svg width="18" height="18" xmlns="https://www.w3.org/2000/svg" > <g fill="#000" fillRule="evenodd">
                                                        <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path>
                                                        <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path>
                                                        <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path>
                                                        <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path>
                                                        <path fill="none" d="M0 0h18v18H0z"></path>
                                                    </g>
                                                    </svg>
                                                </button>
                                            )
                                            }
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy="single_host_origin"
                                        />
                                    </div>
                                </div>
                            }

                            {showPanier ? '' :
                                <div className="zonePanier">
                                    <Panier images={reactLocalStorage.getObject('panier')} removeItems={(n) => props.removeItems(n)} moreItem={(id) => props.moreItem(id)} lessItem={(id) => props.lessItem(id)} />
                                    <NavLink to="/panier" className="buttonPanier" onClick={() => setShowPanier(!showPanier)}>Procéder à l'achat</NavLink>
                                </div>
                            }
                        </div>
                    </div>
                </nav>



            </header>
            {location.pathname === "/" ? <Caroussel images={promotion} titre={titre} /> :

                <div className={nameclass}>
                    <div className="Bandeau-container">
                        <hr />
                        <div className="Bandeau-text">{titre}</div>
                    </div>
                </div>
            }


        </div>
    )
}
export default Header;
