import { useEffect, useRef, useState } from "react";
import "./App.css";

const PRODUCT_IMG =
  "https://images.pexels.com/photos/3737576/pexels-photo-3737576.jpeg?auto=compress&cs=tinysrgb&w=900";
const RITUAL_IMG =
  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=900";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollNav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return solid;
}

function App() {
  useReveal();
  const solid = useScrollNav();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <nav className={`nav ${solid ? "solid" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#" className="brand">VEIL</a>
          <ul className="nav-links">
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#ritual">Ritual</a></li>
            <li><a href="#reviews">Reviews</a></li>
          </ul>
          <a href="#buy" className="nav-cta">Shop</a>
        </div>
      </nav>

      <header className="hero" ref={heroRef}>
        <div className="wrap" style={{ display: "contents" }}>
          <div className="hero-copy">
            <span className="eyebrow reveal">Post Wash Leave-In Serum</span>
            <h1 className="hero-title reveal d1">
              Hair that <em>breathes</em>,<br />weightless shine.
            </h1>
            <p className="hero-sub reveal d2">
              A featherlight leave-in serum that seals cuticles, tames frizz, and
              restores silk-soft movement — without the weight.
            </p>
            <div className="hero-actions reveal d3">
              <a href="#buy" className="btn btn-primary">
                Shop VEIL <span className="arrow">→</span>
              </a>
              <a href="#ritual" className="btn btn-ghost">The Ritual</a>
            </div>
            <div className="hero-meta reveal d3">
              <div className="meta-item">
                <span className="num">96%</span>
                <span className="lbl">Less frizz</span>
              </div>
              <div className="meta-item">
                <span className="num">24h</span>
                <span className="lbl">Lasting shine</span>
              </div>
              <div className="meta-item">
                <span className="num">0</span>
                <span className="lbl">Silicones</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal d2">
            <div className="product-stage">
              <div className="glow" />
              <div className="ring" />
              <div className="ring r2" />
              <img
                src={PRODUCT_IMG}
                alt="VEIL post wash leave-in hair serum bottle"
                className="product-img"
              />
              <span className="badge b1"><span className="dot" />Cruelty-free</span>
              <span className="badge b2"><span className="dot" />Vegan</span>
              <span className="badge b3"><span className="dot" />No silicones</span>
            </div>
          </div>
        </div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Argan oil</span>
          <span>Camellia extract</span>
          <span>Squalane</span>
          <span>Biotin</span>
          <span>Green tea</span>
          <span>Argan oil</span>
          <span>Camellia extract</span>
          <span>Squalane</span>
          <span>Biotin</span>
          <span>Green tea</span>
        </div>
      </div>

      <section className="section" id="benefits">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="section-eyebrow">Why VEIL</div>
            <h2 className="section-title">A veil of <em>nourishment</em>, not weight.</h2>
            <p className="section-desc">
              Each drop is engineered to absorb instantly, leaving strands visibly
              smoother and softer to the touch.
            </p>
          </div>
          <div className="benefits">
            <article className="benefit reveal">
              <div className="benefit-icon">✦</div>
              <h3>Frizz control</h3>
              <p>Plant-derived sealants smooth the cuticle for up to 24 hours, even in 80% humidity.</p>
            </article>
            <article className="benefit reveal d1">
              <div className="benefit-icon">❋</div>
              <h3>Weightless finish</h3>
              <p>A dry-touch oil system absorbs in seconds — no residue, no greasy roots.</p>
            </article>
            <article className="benefit reveal d2">
              <div className="benefit-icon">❀</div>
              <h3>Repair & protect</h3>
              <p>Camellia and argan oils reinforce strands against heat styling and breakage.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="ritual" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ritual">
            <div className="ritual-visual reveal">
              <img src={RITUAL_IMG} alt="Applying VEIL hair serum" />
            </div>
            <div>
              <div className="section-eyebrow reveal">The Ritual</div>
              <h2 className="section-title reveal" style={{ textAlign: "left" }}>
                Three steps to <em>softness</em>
              </h2>
              <ol className="ritual-steps">
                <li className="reveal">
                  <div>
                    <h4>Apply to damp hair</h4>
                    <p>Dispense 2–3 pumps into palms and work through mid-lengths to ends.</p>
                  </div>
                </li>
                <li className="reveal d1">
                  <div>
                    <h4>Comb through</h4>
                    <p>Distribute evenly with a wide-tooth comb before air-drying or styling.</p>
                  </div>
                </li>
                <li className="reveal d2">
                  <div>
                    <h4>Reapply on dry ends</h4>
                    <p>One pump refreshes shine and tames flyaways any time of day.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="reviews" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="section-eyebrow">Reviews</div>
            <h2 className="section-title">Loved by <em>12,000+</em> heads of hair</h2>
          </div>
          <div className="quotes">
            <article className="quote reveal">
              <div className="stars">★★★★★</div>
              <p>"My ends finally feel soft again. It absorbs instantly and never weighs my fine hair down."</p>
              <div className="who">— Maya R.</div>
            </article>
            <article className="quote reveal d1">
              <div className="stars">★★★★★</div>
              <p>"The only leave-in that tames my curls without crunch. The scent is unreal too."</p>
              <div className="who">— Priya S.</div>
            </article>
            <article className="quote reveal d2">
              <div className="stars">★★★★★</div>
              <p>"I use it on damp and dry hair. Shine lasts all day and flyaways are gone."</p>
              <div className="who">— Elena V.</div>
            </article>
          </div>
        </div>
      </section>

      <section className="cta" id="buy">
        <div className="wrap">
          <h2 className="cta-title reveal">
            Ready for <em>weightless</em> shine?
          </h2>
          <p className="reveal d1">
            30-day money-back guarantee. Free shipping on orders over $40.
          </p>
          <a href="#" className="btn btn-primary reveal d2">
            Add to bag — $32 <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span className="brand">VEIL</span>
          <span>© {new Date().getFullYear()} VEIL Beauty. All rights reserved.</span>
          <span>Cruelty-free · Vegan · Made in small batches</span>
        </div>
      </footer>
    </>
  );
}

export default App;
