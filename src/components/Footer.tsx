import { Link } from 'react-router-dom'
import logoWhite from '@/assets/images/logo-header-wite_1.webp'
import facebookImg from '@/assets/images/facebook.webp'
import instaImg from '@/assets/images/insta.webp'
import tiktokImg from '@/assets/images/tick-tok.webp'

export default function Footer() {
  return (
    <section className="footer-light">
      <div className="w-layout-blockcontainer container-7 w-container">
        <div className="div-block-5">
          <Link to="/" className="w-inline-block">
            <img src={logoWhite} loading="lazy" alt="Miss Scarlett" className="image-4" />
          </Link>
        </div>
        <div className="w-layout-layout quick-stack-4 wf-layout-layout">
          <div className="w-layout-cell cell-19">
            <div className="footer-copyright-copy">
              <a href="#" className="link"><sub>Privacy Statement</sub></a>
              <a href="#" className="link-2"><sub>Terms of use</sub></a>
            </div>
          </div>
          <div className="w-layout-cell cell-9">
            <div className="footer-social-block-two">
              <a
                href="https://www.facebook.com/missscarlett.thelabel/"
                className="footer-social-link w-inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebookImg} loading="lazy" alt="Facebook" className="image-5" />
              </a>
              <a
                href="https://www.instagram.com/missscarlett.thelabel/?hl=en"
                className="footer-social-link w-inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instaImg} loading="lazy" alt="Instagram" className="image-6" />
              </a>
              <a
                href="https://www.tiktok.com/@missscarlettthelabel"
                className="footer-social-link w-inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={tiktokImg} loading="lazy" alt="TikTok" className="image-7" />
              </a>
            </div>
          </div>
          <div className="w-layout-cell cell-10">
            <div className="footer-copyright">
              <sub>
                Copyright© 2026 MISS SCARLETT<br />
                Site by{' '}
                <a
                  href="https://www.locally.net.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-4"
                >
                  LOCALLY
                </a>
              </sub>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
