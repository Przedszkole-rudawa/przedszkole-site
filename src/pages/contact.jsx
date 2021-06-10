import React, { useCallback, useState } from 'react';
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import MainLayout from '../layouts/main-layout/main-layout';
import Header from '../layouts/partials/header';

const EMAIL_REGEX = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])$/;
const BODY_MIN = 10;
const BODY_MAX = 1e3;
const NAME_MIN = 3;
const NAME_MAX = 50;

const Contact = () => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [bodyTouched, setBodyTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVerify = useCallback(token => {
    setToken(token);
  }, [setToken]);

  const emailRegexValid = !!email ? EMAIL_REGEX.test(email) : true;
  const bodyLengthValid = !!body ? (body.length >= BODY_MIN && body.length <= BODY_MAX) : true;
  const nameLengthValid = !!name ? (name.length >= NAME_MIN && name.length <= NAME_MAX) : true;
  const formValid = !!email
          && emailRegexValid
          && !!body
          && bodyLengthValid
          && nameLengthValid
          && agreement;

  const submit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setIsError(false);
    const formVal = {
      name,
      email,
      body,
      token
    };
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        body: JSON.stringify(formVal),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
          <GoogleReCaptchaProvider
                  reCaptchaKey="6LejLwUbAAAAAMbIPNpTA4_b40MfFwGidKBO1SjC">
            <MainLayout>
              <Header title="Kontakt"/>
              <div className="container">
                <div className="columns">
                  <div className="column is-6 is-offset-3">
                    {!isSubmitted && (
                            <form noValidate
                                  onSubmit={submit}>
                              <div className="field touch-padded">
                                <label className="label"
                                       htmlFor="nameControl">Imię <span className="is-size-7">(opcjonalnie)</span>
                                </label>
                                <div className="control">
                                  <input className={`input ${nameTouched && !nameLengthValid ? 'is-danger' : ''}`}
                                         type="text"
                                         id="nameControl"
                                         value={name}
                                         onChange={e => setName(e.target.value)}
                                         onBlur={() => setNameTouched(true)}/>
                                </div>
                                {nameTouched && !nameLengthValid && (
                                        <div className="help is-danger">
                                          Pole powinno zawierać od {NAME_MIN} do {NAME_MAX} znaków
                                        </div>
                                )}
                              </div>
                              <div className="field touch-padded">
                                <label className="label"
                                       htmlFor="emailControl">*E-Mail
                                </label>
                                <div className="control">
                                  <input className={`input ${emailTouched && (!email || !emailRegexValid) ? 'is-danger' : ''}`}
                                         type="email"
                                         id="emailControl"
                                         value={email}
                                         onChange={e => setEmail(e.target.value)}
                                         onBlur={() => setEmailTouched(true)}
                                         required/>
                                </div>
                                {emailTouched && !email && (
                                        <div className="help is-danger">
                                          Pole wymagane
                                        </div>
                                )}
                                {emailTouched && !emailRegexValid && (
                                        <div className="help is-danger">
                                          Nieprawidłowy adres e-mail
                                        </div>
                                )}
                              </div>
                              <div className="field touch-padded">
                                <label className="label"
                                       htmlFor="bodyControl">*Treść
                                </label>
                                <div className="control">
                                      <textarea className={`textarea has-fixed-size ${bodyTouched && (!body || !bodyLengthValid) ? 'is-danger' : ''}`}
                                                id="bodyControl"
                                                value={body}
                                                onChange={e => setBody(e.target.value)}
                                                onBlur={() => setBodyTouched(true)}
                                                required
                                                rows="10"/>
                                </div>
                                {bodyTouched && !body && (
                                        <div className="help is-danger">
                                          Pole wymagane
                                        </div>
                                )}
                                {bodyTouched && !bodyLengthValid && (
                                        <div className="help is-danger">
                                          Pole powinno zawierać od {BODY_MIN} do {BODY_MAX} znaków
                                        </div>
                                )}
                              </div>
                              <div className="mb-5 has-text-justified">
                                Uzupełnienie niniejszego formularza stanowi zgodę na przetwarzanie wpisanych danych
                                osobowych przez Przedszkole Niepubliczne Sióstr Służebniczek NMP NP
                                w&nbsp;celu ułatwienia z&nbsp;Państwem kontaktu w&nbsp;związku z&nbsp;wysłaniem
                                zapytania. Zgodę można
                                wycofać w&nbsp;dowolnym czasie. Wycofanie zgody nie wpływa na zgodność z&nbsp;prawem
                                przetwarzania
                                dokonanego przed jej wycofaniem.
                                <br/>
                                <br/>
                                Administratorem Pani/Pana danych osobowych jest Przedszkole Niepubliczne Sióstr
                                Służebniczek NMP NP
                                z&nbsp;siedzibą w&nbsp;Rudawie przy ul.&nbsp;Polaczka&nbsp;27, 32-064&nbsp;Rudawa.
                                Podane przez Panią/Pana dane
                                osobowe będą przetwarzane w&nbsp;celu kontaktu i&nbsp;obsługi Państwa zgłoszenia.
                                <br/>
                                <br/>
                                <label className="checkbox">
                                  <input className="mr-1"
                                         type="checkbox"
                                         defaultChecked={agreement}
                                         onChange={() => setAgreement(!agreement)}/>
                                  Wyrażam zgodę
                                </label>
                              </div>
                              <div className="has-text-centered">
                                <button className={`button is-main is-medium is-rounded ${submitting ? 'is-loading' : ''}`}
                                        type="submit"
                                        disabled={!formValid}>Wyślij
                                </button>
                                {isError && (
                                        <div className="help is-danger mt-5">
                                          Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.
                                        </div>
                                )}
                              </div>
                            </form>
                    )}
                    {isSubmitted && (
                            <div className="has-text-centered">Twoja wiadomość została wysłana.</div>
                    )}
                  </div>
                  <GoogleReCaptcha onVerify={handleVerify}
                                   action="email"/>
                </div>
              </div>
            </MainLayout>
          </GoogleReCaptchaProvider>
  );
};

export default Contact;
