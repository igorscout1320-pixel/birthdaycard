<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Birthday Card Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="page-shell">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Birthday Card Studio</p>
        <h1>Create a joyful birthday card in JavaScript.</h1>
        <p class="hero-text">
          Personalize the message, switch up the mood, and save favorite cards right in the browser.
        </p>
      </div>
      <div class="hero-badges" aria-label="Features">
        <span>Live preview</span>
        <span>Theme picker</span>
        <span>Saved cards</span>
      </div>
    </section>

    <section class="workspace">
      <form id="card-form" class="panel controls" autocomplete="off">
        <div class="panel-heading">
          <h2>Design your card</h2>
          <p>Everything updates instantly while you type.</p>
        </div>

        <label class="field">
          <span>Recipient name</span>
          <input id="recipient" name="recipient" type="text" placeholder="Taylor" maxlength="40" required>
        </label>

        <label class="field">
          <span>From</span>
          <input id="sender" name="sender" type="text" placeholder="Alex" maxlength="40">
        </label>

        <label class="field">
          <span>Birthday message</span>
          <textarea id="message" name="message" rows="5" maxlength="280">Wishing you a day full of cake, laughter, and the kind of memories that last all year.</textarea>
        </label>

        <div class="field">
          <span>Template style</span>
          <div class="choice-grid" id="template-options">
            <label class="chip">
              <input type="radio" name="template" value="spark" checked>
              <span>Spark</span>
            </label>
            <label class="chip">
              <input type="radio" name="template" value="garden">
              <span>Garden</span>
            </label>
            <label class="chip">
              <input type="radio" name="template" value="night">
              <span>Night Glow</span>
            </label>
          </div>
        </div>

        <div class="field">
          <span>Accent color</span>
          <div class="color-row">
            <label class="color-swatch coral">
              <input type="radio" name="accent" value="coral" checked>
              <span>Coral</span>
            </label>
            <label class="color-swatch gold">
              <input type="radio" name="accent" value="gold">
              <span>Gold</span>
            </label>
            <label class="color-swatch mint">
              <input type="radio" name="accent" value="mint">
              <span>Mint</span>
            </label>
            <label class="color-swatch berry">
              <input type="radio" name="accent" value="berry">
              <span>Berry</span>
            </label>
          </div>
        </div>

        <div class="actions">
          <button type="button" id="celebrate-btn" class="btn btn-secondary">Celebrate</button>
          <button type="submit" class="btn btn-primary">Save card</button>
        </div>

        <p id="status" class="status" aria-live="polite"></p>
      </form>

      <section class="panel preview-panel">
        <div class="panel-heading">
          <h2>Live preview</h2>
          <p>Share-worthy and ready in a few clicks.</p>
        </div>

        <article id="card-preview" class="card-preview template-spark accent-coral">
          <div class="card-overlay"></div>
          <div class="card-content">
            <p class="card-kicker">Happy Birthday</p>
            <h3 id="preview-recipient">Taylor</h3>
            <p id="preview-message" class="card-message"></p>
            <p id="preview-sender" class="card-sender"></p>
          </div>
          <div class="card-decor card-decor-a"></div>
          <div class="card-decor card-decor-b"></div>
        </article>
      </section>
    </section>

    <section class="panel saved-panel">
      <div class="panel-heading">
        <h2>Saved cards</h2>
        <p>Your recent designs stay here until you clear the browser data.</p>
      </div>
      <div id="saved-cards" class="saved-cards"></div>
    </section>
  </main>

  <template id="saved-card-template">
    <article class="saved-card">
      <div class="saved-card-copy">
        <p class="saved-card-title"></p>
        <p class="saved-card-message"></p>
        <p class="saved-card-meta"></p>
      </div>
      <button type="button" class="delete-btn">Delete</button>
    </article>
  </template>

  <script src="app.js"></script>
</body>
</html>
