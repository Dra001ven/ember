export default function About() {
  return (
    <section style={{ paddingTop: 48 }}>
      <div className="wrap about-grid">
        <div className="about-media reveal">
          <img
            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=75"
            alt="Chef tending the open fire grill"
          />
        </div>
        <div className="about-copy reveal" style={{ '--d': '.1s' }}>
          <div className="eyebrow">Our Story</div>
          <h2>One grill, no gas, no shortcuts.</h2>
          <p>
            Every dish at Ember &amp; Salt passes over the same oak-fed fire. There's no gas line in the
            building. Chef Mara Voss built the kitchen around a single principle: heat is a seasoning, and it
            should be earned by hand, log by log, all service long.
          </p>
          <p>
            We buy whole from three day-boats and one hill farm, so the menu changes with what actually came in
            that morning.
          </p>
          <div className="about-stats">
            <div className="about-stat"><b>11</b><span>YEARS ON THE HARBOR</span></div>
            <div className="about-stat"><b>1</b><span>WOOD-FIRE GRILL, NO GAS</span></div>
            <div className="about-stat"><b>3</b><span>DAY-BOATS WE BUY FROM</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
