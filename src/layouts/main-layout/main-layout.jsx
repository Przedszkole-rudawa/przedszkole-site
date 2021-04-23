import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faClock, faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react'
import { Helmet } from 'react-helmet';
import '../../styles/styles.scss';
import Navigation from '../partials/navigation/nav';
import logoImage from './logo.png';
import * as styles from './main-layout.module.scss';

const MainLayout = ({ children }) => {
  const navigateToMap = () => {
    if (window) {
      window.open('https://www.google.pl/maps/place/Przedszkole+Niepubliczne+Si%C3%B3str+S%C5%82u%C5%BCebniczek+NMP+NP/@50.1232534,19.7048713,17z/data=!3m1!4b1!4m5!3m4!1s0x4716f700c80eeafd:0xb6cfd60f7e175d3a!8m2!3d50.12325!4d19.70706', 'blank');
    }
  }
  return (
          <StaticQuery query={graphql`
          query MainQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
          `}
                       render={data => (
                               <>
                                 <Helmet title={data.site.siteMetadata.title}
                                         bodyAttributes={{ class: 'has-navbar-fixed-top' }}
                                         defer={false}/>
                                 <Navigation/>
                                 {children}
                                 <footer className="mt-6">
                                   <section className={styles.topFooter}>
                                     <div className={styles.leftBg}/>
                                     <div className={styles.rightBg}
                                          onClick={navigateToMap}
                                          role="link"/>
                                     <div className="container">
                                       <div className="columns">
                                         <div className="column is-half-desktop is-flex is-flex-direction-column is-align-items-center">
                                           <figure className={`${styles.logoImage} image mt-6`}>
                                             <img src={logoImage}
                                                  alt="Logo przedszkola"/>
                                           </figure>
                                           <div>
                                             <h2 className={`${styles.contact} mt-5`}>Kontakt</h2>
                                             <ul className="mt-4 mb-6">
                                               <li className={styles.contactsListItem}>
                                                 <FontAwesomeIcon icon={faPhone}
                                                                  size="2x"
                                                                  listItem/>
                                                 <span>+48 12 283 80 50</span>
                                               </li>
                                               <li className={styles.contactsListItem}>
                                                 <FontAwesomeIcon icon={faEnvelope}
                                                                  size="2x"
                                                                  listItem/>
                                                 <span>
                                               <a href="mailto:przedszkole.rudawa@sluzebniczkikr.pl">przedszkole.rudawa@sluzebniczkikr.pl</a>
                                               </span>
                                               </li>
                                               <li className={styles.contactsListItem}>
                                                 <FontAwesomeIcon icon={faMapMarkerAlt}
                                                                  size="2x"
                                                                  listItem/>
                                                 <span>ul. Polaczka 27, 32-064 Rudawa</span>
                                               </li>
                                               <li className={styles.contactsListItem}>
                                                 <FontAwesomeIcon icon={faClock}
                                                                  size="2x"
                                                                  listItem/>
                                                 <span>6:30 - 16:30 (od poniedziałku do piątku)</span>
                                               </li>
                                             </ul>
                                           </div>
                                         </div>
                                       </div>
                                     </div>
                                   </section>
                                   <section className={`${styles.bottomFooter} has-text-centered`}>
                                     <span className={styles.separated}>Copyright &copy; 2021 Niepubliczne Przedszkole Sióstr Służebniczek Zgromadzenia NMP NP</span>
                                     <a className="plain"
                                        href="https://www.facebook.com/Przedszkole-Niepubliczne-Si%C3%B3str-S%C5%82u%C5%BCebniczek-NMP-NP-w-Rudawie-111121330268531"
                                        target="_blank">
                                       <FontAwesomeIcon icon={faFacebookF}/>
                                     </a>
                                   </section>
                                 </footer>
                               </>
                       )}/>
  )
}

export default MainLayout;