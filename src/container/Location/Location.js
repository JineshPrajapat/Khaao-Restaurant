import React from "react";
import './Location.scss';

function Location() {
    return(
        <section class="Location">
         <div class="area">
            <h3>Location</h3>
            <div class="small">
               <p>132 W Main St.</p>
               <p>Rishabhdeo, CA 91801</p>
            </div>
         </div>
         <div class="hours">
            <h3>Hours</h3>
            <div class="small">
               <p>Brunch: Thursday - Monday, 8am to </p>
               <p>2:30pm </p>
               <p>Dinner: Thursday - Sunday, 4pm to 10pm</p>
               <p>Closed Tuesdays & Wednesdays</p>
            </div>
         </div>
         <div class="park">
            <div class="small">
               <p>Here are directions to our location.</p>
               <p>We hope to see you soon!</p>
               <p><a href="#">Get Directions</a></p>
               <p><a href="#">Parking Information</a></p>
            </div>
         </div>
      </section>
    );
}

export default Location;