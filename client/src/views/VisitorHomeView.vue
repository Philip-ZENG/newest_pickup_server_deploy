<template>
  <body>
    <section id="title">
      <div class="container-fluid heading-box">
        <!-- Title -->
        <div class="row">
          <div class="col">
            <h1>Pick Up</h1>
            <h1>Your Friends and Hang Out Together</h1>
            <button
              type="button"
              class="btn btn-outline-light btn-lg heading-button"
              @click="goToLogIn"
            >
              Log In
            </button>
            <button
              type="button"
              class="btn btn-outline-light btn-lg heading-button"
              @click="goToRegister"
            >
              Sign Up
            </button>
            <button
              type="button"
              class="btn btn-outline-light btn-lg heading-button"
              @click="goToHomeAsGuest"
            >
              Visit As Guest
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->

    <section id="features">
      <div class="container-fluid feature-containter">
        <div class="row">
          <div class="feature-box col-lg-4">
            <font-awesome-icon icon="circle-check" class="icon fa-4x" />
            <h3 class="feature-title">Easy to use</h3>
            <p class="feature-description">
              So easy to use, start to pick up your friend within a second.
            </p>
          </div>

          <div class="feature-box col-lg-4">
            <font-awesome-icon icon="bullseye" class="icon fa-4x" />
            <h3 class="feature-title">Save You From Trouble</h3>
            <p class="feature-description">
              Find your friends who have the same needs as you do with one or two clicks.
            </p>
          </div>

          <div class="feature-box col-lg-4">
            <font-awesome-icon icon="heart" class="icon fa-4x" />
            <h3 class="feature-title">Popular Among Campus</h3>
            <p class="feature-description">
              More than 1000+ students and faculties are now using Pick Up in CUHKSZ.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->

    <section id="testimonials">
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="false">
        <div class="carousel-inner">
          <div class="carousel-item">
            <h2 class="testimonial-text">
              I used to struggle for finding group mates for projects, but with PickUp's help, I've
              found wonderful team mates within minutes.
            </h2>
            <img
              class="testimonial-image"
              src="../assets/VisitorHome/lady-img.jpg"
              alt="lady-profile"
            />
            <em>Beverly, Diligentia College</em>
          </div>
          <div class="carousel-item active">
            <h2>
              I no longer have to ask around to find people to team up. I've found the most
              convinient way of finding teammates.
            </h2>
            <img
              class="testimonial-image"
              src="../assets/VisitorHome/dog-img.jpg"
              alt="dog-profile"
            />
            <em>Philip, Shaw College</em>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>

    <!-- Press -->

    <section id="press">
      <img class="press-logo" src="../assets/VisitorHome/TechCrunch.png" alt="tc-logo" />
      <img class="press-logo" src="../assets/VisitorHome/tnw.png" alt="tnw-logo" />
      <img class="press-logo" src="../assets/VisitorHome/bizinsider.png" alt="biz-insider-logo" />
      <img class="press-logo" src="../assets/VisitorHome/mashable.png" alt="mashable-logo" />
    </section>

    <!-- Pricing -->

    <section id="pricing">
      <h2>A Plan for Everyone's Needs</h2>
      <p>Simple and affordable price plans for you.</p>

      <div class="row pricing-row">
        <div class="col-lg-6 col-md-6 pricing-col">
          <div class="card">
            <div class="card-header">
              <h3>Free Trial</h3>
            </div>
            <div class="card-body">
              <h2>Free</h2>
              <p>5 Posts Per Day</p>
              <p>10 Joins Per Day</p>
              <p>Unlimited App Usage</p>
              <button
                type="button"
                class="btn btn-lg btn-outline-dark pricing-btn"
                @click="goToRegister"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 pricing-col">
          <div class="card">
            <div class="card-header">
              <h3>Prime</h3>
            </div>
            <div class="card-body">
              <h2>$3.99/ mo</h2>
              <p>Unlimited Posts</p>
              <p>Unlimited Joins</p>
              <p>Unlimited App Usage</p>
              <button type="button" class="btn btn-lg btn-dark pricing-btn" @click="goToRegister">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->

    <section id="cta">
      <h3 id="cta-title">Disover The New Life with PickUp Today</h3>
      <button
        type="button"
        class="btn btn-outline-light btn-lg heading-button"
        @click="goToHomeAsGuest"
      >
        Visit As Guest
      </button>
    </section>

    <!-- Footer -->

    <footer id="footer">
      <font-awesome-icon icon="envelope" class="footer-icon" />
      <font-awesome-icon :icon="['fab', 'twitter']" class="footer-icon" />
      <font-awesome-icon :icon="['fab', 'facebook']" class="footer-icon" />
      <font-awesome-icon :icon="['fab', 'instagram']" class="footer-icon" />
      <p>© Copyright PickUp</p>
    </footer>
  </body>
</template>

<script>
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/fontawesome-free-brands';
/* add icons to the library */
library.add(fas, faTwitter, faFacebook, faInstagram);

export default {
  methods: {
    goToLogIn() {
      this.$store.dispatch('setIsGuest', { isGuest: false });
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToHomeAsGuest() {
      this.$store.dispatch('setIsGuest', { isGuest: true });
      this.$router.push('/userHome');
    },
  },
};
</script>

<style scoped>
/* Import google fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Ubuntu&display=swap');

body {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}
h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 3.5rem;
  line-height: 1.5;
  color: white;
  margin-bottom: 5%;
}
h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 3rem;
  line-height: 1.5;
}
.heading-box {
  padding: 5% 20% 3% 20%;
}
#title {
  background-color: #ff4c68;
}
#iphone-mockup {
  width: 350px;
  height: auto;
  transform: rotate(20deg);
  margin-left: 100px;
  margin-top: 2%;
  position: absolute;
  z-index: 0;
}

/* Navigation Bar */
.navbar {
  padding: 0 0 4.5rem;
}
.navbar-brand {
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Ubuntu', sans-serif;
}
.nav-item {
  font-size: 1.5rem;
  margin: 0 10px;
}

/* Download Buttons */
.heading-button {
  margin: 3% 3% 3% 0;
}

/* Feature */
.feature-title {
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-top: 10px;
}
.feature-description {
  color: #8f8f8f;
  width: 60%;
  margin: auto;
}
.feature-box {
  text-align: center;
  padding: 5%;
}
.feature-containter {
  padding: 7% 15%;
  background-color: white;
  position: relative;
  z-index: 1;
}
.icon {
  color: #ef8172;
}
.icon:hover {
  color: #ff4c68;
}

/* Testimonials */
#testimonials {
  text-align: center;
  background-color: #ef8172;
  color: white;
}
.testimonial-image {
  width: 10%;
  border-radius: 100%;
  margin: 3%;
}
.carousel-item {
  padding: 7% 15% 3%;
}
/* Press */
#press {
  background-color: #ef8172;
  text-align: center;
  padding-bottom: 2%;
}
.press-logo {
  width: 10%;
  margin: 20px 20px 50px;
}

/* Pricing */
#pricing {
  text-align: center;
  padding: 100px;
}
.pricing-btn {
  width: 100%;
}
.pricing-row {
  padding: 3% 25%;
}
.pricing-col {
  padding: 3% 2%;
}

/* Call to Action */
#cta {
  background-color: #ff4c68;
  text-align: center;
  padding: 7% 15% 3%;
}
#cta-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 3.5rem;
  line-height: 1.5;
  color: white;
}
.cta-download-button {
  margin: 2% 1% 2%;
}

/* Footer */
#footer {
  background-color: white;
  text-align: center;
  padding: 3% 10%;
}
.footer-icon {
  margin: 0.4%;
}

@media (max-width: 1028px) {
  #iphone-mockup {
    position: static;
    transform: rotate(0);
    margin: auto;
  }
  #title {
    text-align: center;
  }
}
</style>
