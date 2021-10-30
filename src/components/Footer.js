import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return(
            <footer
        class="site-footer critical-hidden"
        role="contentinfo"
        data-section-id="footer"
        data-section-type="footer-section"
      >
        <div class="page-width">
          <div class="grid grid--no-gutters small--text-center grid--footer-float-right">
            <div class="grid__item small--hide one-half site-footer-item-center-vertically mm-payment-icon">
              <div class="grid__item site-footer__payment-icons mm-payment-inner-container">
                <span class="visually-hidden">Payment methods</span>
                <ul class="payment-icons list--inline site-footer__icon-list">
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="38"
                      role="img"
                      aria-labelledby="pi-airtel_money"
                    >
                      <title id="pi-airtel_money">Airtel Money</title>
                      <g fill-rule="evenodd" fill="none">
                        <path
                          fill="#EDEDED"
                          d="M34.5 24h-31C1.6 24 0 22.4 0 20.5v-17C0 1.6 1.6 0 3.5 0h31C36.4 0 38 1.6 38 3.5v17c0 1.9-1.6 3.5-3.5 3.5z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M3.5 1C2.1 1 1 2.1 1 3.5v17C1 21.9 2.1 23 3.5 23h31c1.4 0 2.5-1.1 2.5-2.5v-17C37 2.1 35.9 1 34.5 1h-31z"
                        ></path>
                        <path
                          fill="#EB2227"
                          d="M22.3 3c.6.1 1.2.2 1.7.3 2.2.4 3.9 2 4.5 4.1.3 1.6.1 3.3-.7 4.7-.9 1.8-2.1 3.3-3.7 4.5-2.1 1.8-4.6 3.2-7.3 4.1-.6.2-1.3.3-1.9.3-1.1.1-2.1-.7-2.2-1.8v-.5c.2-2.1 1.7-3.8 3.8-4.4.5 0 1 0 1.4.2.5.2.8.8.6 1.4-.1.2-.2.3-.3.4-.4.4-.8.8-1.2 1.1s-.7.6-1 1c-.2.2-.3.4-.4.6-.2.4 0 .6.4.6.2 0 .4 0 .6-.1 3.5-1.3 6.3-3.7 8.1-6.9.3-.5.4-1 .4-1.6.1-1.7-1-2.7-2.6-2.2-1.2.4-2.5.9-3.6 1.5-1.2.6-2.4 1.4-3.6 2-.9.5-1.9.8-3 .9-.5.1-1 0-1.4-.1-1-.1-1.8-1.1-1.6-2.3 0-.1 0-.2.1-.3.5-1.4 1.4-2.7 2.6-3.5 2.3-1.8 5-3.1 7.9-3.7.5-.1 1.1-.2 1.6-.3h.8z"
                        ></path>
                      </g>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      viewBox="0 0 38 24"
                      width="38"
                      height="24"
                      aria-labelledby="pi-american_express"
                    >
                      <title id="pi-american_express">American Express</title>
                      <g fill="none">
                        <path
                          fill="#000"
                          d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z"
                          opacity=".07"
                        ></path>
                        <path
                          fill="#006FCF"
                          d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"
                        ></path>
                      </g>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="38"
                      role="img"
                      aria-labelledby="pi-freecharge"
                    >
                      <title id="pi-freecharge">Freecharge</title>
                      <g fill-rule="evenodd" fill="none">
                        <path
                          fill="#EDEDED"
                          d="M34.5 24h-31C1.6 24 0 22.4 0 20.5v-17C0 1.6 1.6 0 3.5 0h31C36.4 0 38 1.6 38 3.5v17c0 1.9-1.6 3.5-3.5 3.5z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M3.5 1C2.1 1 1 2.1 1 3.5v17C1 21.9 2.1 23 3.5 23h31c1.4 0 2.5-1.1 2.5-2.5v-17C37 2.1 35.9 1 34.5 1h-31z"
                        ></path>
                        <circle cy="12" cx="19" r="9" fill="#E2704D"></circle>
                        <path
                          fill="#fff"
                          d="M16.6 11.7l.1-1.4s.7.1.9-.1c.4-.3.4-.9.5-1.2.3-1.4 2-2.2 3.8-1.7l-.2 1.4s-.1-.1-.4-.1c-1.1-.1-1.6.2-1.7 1.7h1.5l-.2 1-2.4 2.4h1.4c-1.2 1.3-2.8 2.9-3.8 3.8l1.3-2.6h-1.1c1-1.9 1-2 1.7-3.3"
                        ></path>
                      </g>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      width="38"
                      height="24"
                      aria-labelledby="pi-master"
                    >
                      <title id="pi-master">Mastercard</title>
                      <path
                        opacity=".07"
                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                      ></path>
                      <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                      <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                      <path
                        fill="#FF5F00"
                        d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                      ></path>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      width="38"
                      height="24"
                      role="img"
                      aria-labelledby="pi-mobikwik"
                    >
                      <title id="pi-mobikwik">MobiKwik</title>
                      <rect
                        x=".5"
                        y=".5"
                        width="37"
                        height="23"
                        rx="3"
                        ry="3"
                        fill="#fff"
                        stroke="#000"
                        stroke-opacity=".07"
                      ></rect>
                      <path
                        d="M31.15 8.52a3.33 3.33 0 0 0-1 .1c-.25.05-.49.17-.75.23a5.29 5.29 0 0 1-.65.07c.07-1 .12-2 .2-3a1 1 0 0 0-.87-1.15 7.37 7.37 0 0 0-1.07 0v-.41a.75.75 0 0 0-.94-.82l-.7.11-7 1.17v7.08a3.94 3.94 0 0 1-.2.91c-.08.31-.17.63-.26 1a.16.16 0 0 0 0 .14l3.75-7.33A1.07 1.07 0 0 1 22.91 6a1.06 1.06 0 0 1 .84 1.07v9.7a1.09 1.09 0 0 1-2.17 0v-5h-.08l-2.92 5.6q-.17.33-.36.63a1.09 1.09 0 0 1-1.21.45 1 1 0 0 1-.75-1V8.84h-.13l-5.42 10.29a1.12 1.12 0 1 1-2-1c.62-1.13 1.21-2.24 1.79-3.34l4.92-9.47-6.32 1a1.42 1.42 0 0 0-1.1.94v13.08A1 1 0 0 0 9 21h15.29a1.12 1.12 0 0 0 1.2-.92l.06-.23h1.1a.81.81 0 0 0 .75-.39 2.05 2.05 0 0 0 .27-.67c.08-.44.11-.9.16-1.35q.26-2.42.51-4.85a.19.19 0 0 1 .19-.2c.26 0 .5-.09.75-.14a4.5 4.5 0 0 0 1.86-.75A2 2 0 0 0 32 9.7a1.08 1.08 0 0 0-.85-1.18zm-3.37-2.6c-.1.67-.14 1.36-.21 2-.12 1.18-.23 2.36-.35 3.55L26.86 15q-.16 1.5-.33 3a.63.63 0 0 1-.87.53L27 4.78a6 6 0 0 1 .55.45.75.75 0 0 1 .23.68zm2.47 5a.86.86 0 0 1-.84-.92.85.85 0 0 1 .85-.85.86.86 0 0 1-.01 1.73zm.56-.92a.55.55 0 0 1-.54.54.54.54 0 1 1 .54-.54z"
                        fill="#26bcbc"
                      ></path>
                      <path
                        d="M18 13.89zm-8.64 6a1.12 1.12 0 0 1-.57-1.74c.54-1.15 1.13-2.26 1.71-3.36l5.75-11.05a1.12 1.12 0 0 1 1.44-.61 1.13 1.13 0 0 0-1.49.57l-5.91 11.16c-.6 1.14-1.2 2.26-1.78 3.39a1.13 1.13 0 0 0 1.43 1.63 1.11 1.11 0 0 1-.62 0zM21.71 6.57A1.06 1.06 0 0 1 22.79 6a1.07 1.07 0 0 0-1.15.55c-.81 1.57-2.11 4.22-2.92 5.88zm1 11.28a1.09 1.09 0 0 1-1.09-1.09v-5h-.12.06v5.07a1.1 1.1 0 0 0 2.2 0v-.1a1.09 1.09 0 0 1-1.1 1.12zM23.73 7a1 1 0 0 1 0 .11V7zM17 18.44a1 1 0 0 1-.75-1v-8.6h-.12v8.7a1.06 1.06 0 0 0 .79 1 1.1 1.1 0 0 0 1.08-.3 1.09 1.09 0 0 1-1 .2z"
                        fill="#00aaa8"
                      ></path>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="38"
                      role="img"
                      aria-labelledby="pi-ola_money"
                    >
                      <title id="pi-ola_money">Ola Money</title>
                      <g fill-rule="evenodd" fill="none">
                        <path
                          fill="#EDEDED"
                          d="M34.5 24h-31C1.6 24 0 22.4 0 20.5v-17C0 1.6 1.6 0 3.5 0h31C36.4 0 38 1.6 38 3.5v17c0 1.9-1.6 3.5-3.5 3.5z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M3.5 1C2.1 1 1 2.1 1 3.5v17C1 21.9 2.1 23 3.5 23h31c1.4 0 2.5-1.1 2.5-2.5v-17C37 2.1 35.9 1 34.5 1h-31z"
                        ></path>
                        <ellipse
                          rx="8.8"
                          ry="9"
                          cy="12"
                          cx="19"
                          fill="#378F43"
                        ></ellipse>
                        <path
                          fill="#8BC249"
                          d="M19.1 8.8L17 15.4h-2.2l2.1-6.6zm4.1 0l-2.1 6.5h-2.3l2.1-6.6z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M12.7 8.8l2.1 6.6H17l-2-6.6h-2.3zm4.2 0l2.1 6.6h2.3l-2.1-6.6h-2.3zm4.1 0l2.1 6.6h2.3l-2.1-6.6H21z"
                        ></path>
                      </g>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      width="38"
                      height="24"
                      role="img"
                      aria-labelledby="pi-paytm"
                    >
                      <title id="pi-paytm">Paytm</title>
                      <rect
                        x=".5"
                        y=".5"
                        width="37"
                        height="23"
                        rx="3"
                        ry="3"
                        fill="#fff"
                        stroke="#000"
                        stroke-opacity=".07"
                      ></rect>
                      <path
                        d="M14.17 13.32v2.6a.87.87 0 0 1-.74.91h-2.7a1.83 1.83 0 0 1-2-1.9 14.66 14.66 0 0 1 .06-2.08 1.81 1.81 0 0 1 1.69-1.54h1.19a.31.31 0 0 0 .34-.41.33.33 0 0 0-.23-.41H10c-.38 0-.46-.08-.46-.47V8.91a.3.3 0 0 1 .25-.35h2.39a1.87 1.87 0 0 1 1.92 2.1c.08.91.07 1.79.07 2.66zm-3.32 1.34a.34.34 0 0 0 .31.36h.61a.33.33 0 0 0 .36-.35v-1.13c0-.3-.16-.36-.72-.36s-.53.1-.56.37v1.11zm9.58-2.73v2.81a2 2 0 0 1-1.85 2.15h-2.45c-.34 0-.42-.07-.42-.42v-1.26a.3.3 0 0 1 .29-.35h2a.32.32 0 0 0 .36-.34.33.33 0 0 0-.31-.35h-1a1.94 1.94 0 0 1-2-1.86V9a.32.32 0 0 1 .26-.37h1.34c.34 0 .42.1.42.45v2.6c0 .45.1.54.55.54h.05c.62 0 .67-.05.67-.66V9a.36.36 0 0 1 .45-.5H20a.36.36 0 0 1 .42.42c.01 1.08.01 2.02.01 3.01zM4.57 14.48v1.94c0 .46-.06.51-.52.51H2.87a.3.3 0 0 1-.36-.36V9a.28.28 0 0 1 .22-.32H6.2a1.66 1.66 0 0 1 1.62 1.61 17.62 17.62 0 0 1 0 2.49 1.74 1.74 0 0 1-1.73 1.74H4.57zm0-2.08h.86a.32.32 0 0 0 .32-.31V11a.32.32 0 0 0-.28-.35h-.88v1.74z"
                        fill="#22346c"
                      ></path>
                      <path
                        d="M28.94 9a2.2 2.2 0 0 1 2.86.1 7.28 7.28 0 0 1 1.15-.51 2.08 2.08 0 0 1 2.56 2v5.83c0 .36-.09.45-.45.45h-1.15a.35.35 0 0 1-.42-.42v-5.24a.6.6 0 0 0-.79-.64.55.55 0 0 0-.49.58v5.4a.31.31 0 0 1-.25.36h-1.43a.3.3 0 0 1-.35-.31v-5.43a.48.48 0 0 0-.29-.55 1.38 1.38 0 0 0-.71 0 .48.48 0 0 0-.26.53v5.21c0 .48-.06.55-.56.55h-1c-.36 0-.42-.08-.42-.44V9c0-.42.06-.47.46-.47h1.09a.42.42 0 0 1 .45.47zm-5.43 1.64h-.77a.33.33 0 0 1-.41-.4V9a.31.31 0 0 1 .25-.36h.1a2 2 0 0 0 1.74-1 2 2 0 0 1 .58-.57c.24-.16.42 0 .44.27v1.27h.7a.36.36 0 0 1 .42.42v1.22a.35.35 0 0 1-.42.42h-.66v5.83c0 .42-.07.48-.47.49h-1.09a.34.34 0 0 1-.42-.42c.01-1.87.01-5.78.01-5.92z"
                        fill="#24b8eb"
                      ></path>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      width="38"
                      height="24"
                      role="img"
                      aria-labelledby="pi-payzapp"
                    >
                      <title id="pi-payzapp">PayZapp</title>
                      <rect
                        x=".5"
                        y=".5"
                        width="37"
                        height="23"
                        rx="3"
                        ry="3"
                        fill="#fff"
                        stroke="#000"
                        stroke-opacity=".07"
                      ></rect>
                      <path
                        d="M18.3 4.92H12v6.37h2.45V7.4h3.85V4.92zm1.4 0V7.4h3.86v3.89H26V4.92h-6.3zm3.85 7.78v3.9H19.7v2.47H26v-6.36h-2.45zm-9.1 3.9v-3.89H12v6.36h6.3V16.6h-3.85z"
                        fill="#ed232a"
                      ></path>
                      <path d="M16.91 9.88h4.19v4.24H17z" fill="#004c8f"></path>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="24"
                      role="img"
                      aria-labelledby="pi-rupay"
                    >
                      <title id="pi-rupay">RuPay</title>
                      <g fill="none" fill-rule="evenodd">
                        <rect
                          stroke-opacity=".07"
                          stroke="#000"
                          fill="#FFF"
                          x=".5"
                          y=".5"
                          width="37"
                          height="23"
                          rx="3"
                        ></rect>
                        <path
                          fill="#097A44"
                          d="M32 15.77l2-7.41 2 3.82z"
                        ></path>
                        <path
                          fill="#F46F20"
                          d="M30.76 15.79l2-7.4 2 3.82z"
                        ></path>
                        <path
                          d="M20.67 8.2a2 2 0 0 0-1.56-.56h-3l-1.95 6.81h1.75l.66-2.31h1.23a3.4 3.4 0 0 0 1.9-.5 2.93 2.93 0 0 0 1.12-1.72 1.77 1.77 0 0 0-.15-1.72zm-3.21.94h1.12a.76.76 0 0 1 .55.15c.11.11.07.35 0 .53a1.08 1.08 0 0 1-.4.62 1.21 1.21 0 0 1-.7.2H17l.46-1.5zM9.14 9a1.64 1.64 0 0 0-.2-.61 1.3 1.3 0 0 0-.58-.53 2.75 2.75 0 0 0-1.08-.18H4l-2 6.75h1.73l.72-2.52H5.7c.47 0 .58.1.6.13.02.03.09.15 0 .65l-.16.6a3.35 3.35 0 0 0-.11.59v.55h1.79l.12-.43-.11-.08s-.07-.05-.06-.2c.027-.19.07-.377.13-.56l.1-.42a2.14 2.14 0 0 0 .1-1.11.88.88 0 0 0-.26-.41 2 2 0 0 0 .68-.54 2.79 2.79 0 0 0 .53-1c.07-.22.101-.45.09-.68zm-1.86.83a.84.84 0 0 1-.5.6 1.79 1.79 0 0 1-.64.09H4.86l.38-1.33h1.43a1.1 1.1 0 0 1 .53.09c.05 0 .21.07.08.5v.05zm4.9 2.17a2.11 2.11 0 0 1-.3.67 1 1 0 0 1-.87.43c-.34 0-.36-.14-.38-.2a1.24 1.24 0 0 1 .07-.52l.89-3.11H9.9l-.86 3a3 3 0 0 0-.15 1.32c.08.42.4.91 1.41.91.247.004.493-.03.73-.1a2.51 2.51 0 0 0 .6-.29l-.08.3h1.62l1.47-5.13H13L12.18 12zm12.93 1.1l.63-2.18c.24-.83-.07-1.21-.37-1.39A2.75 2.75 0 0 0 24 9.2a2.87 2.87 0 0 0-2 .68 2.75 2.75 0 0 0-.69 1.1l-.09.26h1.61v-.11a1.15 1.15 0 0 1 .25-.37.84.84 0 0 1 .56-.17.89.89 0 0 1 .46.08v.18c0 .06 0 .15-.25.23a2.13 2.13 0 0 1-.48.1l-.44.05a4 4 0 0 0-1.25.32c-.57.271-.99.78-1.15 1.39a1.25 1.25 0 0 0 .17 1.22c.289.307.7.468 1.12.44a2.43 2.43 0 0 0 1.07-.25l.4-.23v.33H25l.13-.48-.13-.07a.61.61 0 0 1 0-.22c0-.25.07-.43.11-.58zm-2.92-.1a.62.62 0 0 1 .34-.4 2.17 2.17 0 0 1 .57-.15l.29-.05.3-.07v.07a1.24 1.24 0 0 1-.51.75 1.44 1.44 0 0 1-.72.21.34.34 0 0 1-.25-.08.55.55 0 0 1-.02-.28zm7.91-3.68l-1.69 3v-3h-1.8l.39 5.13-.12.19a.8.8 0 0 1-.23.25.64.64 0 0 1-.24.08h-.68l-.39 1.37h.83a2 2 0 0 0 1.29-.34 9.55 9.55 0 0 0 1.27-1.71l3.17-5-1.8.03z"
                          fill="#302F82"
                        ></path>
                      </g>
                    </svg>
                  </li>
                  <li class="payment-icon">
                    <svg
                      class="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      width="38"
                      height="24"
                      aria-labelledby="pi-visa"
                    >
                      <title id="pi-visa">Visa</title>
                      <path
                        opacity=".07"
                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                      ></path>
                      <path
                        d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                        fill="#142688"
                      ></path>
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
            <div class="grid__item one-half small--one-whole site-footer-item-tall mm-social-icons">
              <ul class="list--inline site-footer__social-icons social-icons site-footer__icon-list">
                <li class="social-icons__item">
                  <a
                    class="social-icons__link"
                    href="https://facebook.com/picframe.in"
                    aria-describedby="a11y-external-message"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      class="icon icon-facebook"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="#444"
                        d="M18.05.811q.439 0 .744.305t.305.744v16.637q0 .439-.305.744t-.744.305h-4.732v-7.221h2.415l.342-2.854h-2.757v-1.83q0-.659.293-1t1.073-.342h1.488V3.762q-.976-.098-2.171-.098-1.634 0-2.635.964t-1 2.72V9.47H7.951v2.854h2.415v7.221H1.413q-.439 0-.744-.305t-.305-.744V1.859q0-.439.305-.744T1.413.81H18.05z"
                      ></path>
                    </svg>
                    <span class="icon__fallback-text">Facebook</span>
                  </a>
                </li>
                <li class="social-icons__item">
                  <a
                    class="social-icons__link"
                    href="https://twitter.com/picframe.in"
                    aria-describedby="a11y-external-message"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      class="icon icon-twitter"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="#444"
                        d="M19.551 4.208q-.815 1.202-1.956 2.038 0 .082.02.255t.02.255q0 1.589-.469 3.179t-1.426 3.036-2.272 2.567-3.158 1.793-3.963.672q-3.301 0-6.031-1.773.571.041.937.041 2.751 0 4.911-1.671-1.284-.02-2.292-.784T2.456 11.85q.346.082.754.082.55 0 1.039-.163-1.365-.285-2.262-1.365T1.09 7.918v-.041q.774.408 1.773.448-.795-.53-1.263-1.396t-.469-1.864q0-1.019.509-1.997 1.487 1.854 3.596 2.924T9.81 7.184q-.143-.509-.143-.897 0-1.63 1.161-2.781t2.832-1.151q.815 0 1.569.326t1.284.917q1.345-.265 2.506-.958-.428 1.386-1.732 2.18 1.243-.163 2.262-.611z"
                      ></path>
                    </svg>
                    <span class="icon__fallback-text">Twitter</span>
                  </a>
                </li>
                <li class="social-icons__item">
                  <a
                    class="social-icons__link"
                    href="https://pinterest.com/picframe.in"
                    aria-describedby="a11y-external-message"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      class="icon icon-pinterest"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="#444"
                        d="M9.958.811q1.903 0 3.635.744t2.988 2 2 2.988.744 3.635q0 2.537-1.256 4.696t-3.415 3.415-4.696 1.256q-1.39 0-2.659-.366.707-1.147.951-2.025l.659-2.561q.244.463.903.817t1.39.354q1.464 0 2.622-.842t1.793-2.305.634-3.293q0-2.171-1.671-3.769t-4.257-1.598q-1.586 0-2.903.537T5.298 5.897 4.066 7.775t-.427 2.037q0 1.268.476 2.22t1.427 1.342q.171.073.293.012t.171-.232q.171-.61.195-.756.098-.268-.122-.512-.634-.707-.634-1.83 0-1.854 1.281-3.183t3.354-1.329q1.83 0 2.854 1t1.025 2.61q0 1.342-.366 2.476t-1.049 1.817-1.561.683q-.732 0-1.195-.537t-.293-1.269q.098-.342.256-.878t.268-.915.207-.817.098-.732q0-.61-.317-1t-.927-.39q-.756 0-1.269.695t-.512 1.744q0 .39.061.756t.134.537l.073.171q-1 4.342-1.22 5.098-.195.927-.146 2.171-2.513-1.122-4.062-3.44T.59 10.177q0-3.879 2.744-6.623T9.957.81z"
                      ></path>
                    </svg>
                    <span class="icon__fallback-text">Pinterest</span>
                  </a>
                </li>
                <li class="social-icons__item">
                  <a
                    class="social-icons__link"
                    href="https://instagram.com/picframe.in"
                    aria-describedby="a11y-external-message"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      class="icon icon-instagram"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 49.5c67.3 0 75.2.3 101.8 1.5 24.6 1.1 37.9 5.2 46.8 8.7 11.8 4.6 20.2 10 29 18.8s14.3 17.2 18.8 29c3.4 8.9 7.6 22.2 8.7 46.8 1.2 26.6 1.5 34.5 1.5 101.8s-.3 75.2-1.5 101.8c-1.1 24.6-5.2 37.9-8.7 46.8-4.6 11.8-10 20.2-18.8 29s-17.2 14.3-29 18.8c-8.9 3.4-22.2 7.6-46.8 8.7-26.6 1.2-34.5 1.5-101.8 1.5s-75.2-.3-101.8-1.5c-24.6-1.1-37.9-5.2-46.8-8.7-11.8-4.6-20.2-10-29-18.8s-14.3-17.2-18.8-29c-3.4-8.9-7.6-22.2-8.7-46.8-1.2-26.6-1.5-34.5-1.5-101.8s.3-75.2 1.5-101.8c1.1-24.6 5.2-37.9 8.7-46.8 4.6-11.8 10-20.2 18.8-29s17.2-14.3 29-18.8c8.9-3.4 22.2-7.6 46.8-8.7 26.6-1.3 34.5-1.5 101.8-1.5m0-45.4c-68.4 0-77 .3-103.9 1.5C125.3 6.8 107 11.1 91 17.3c-16.6 6.4-30.6 15.1-44.6 29.1-14 14-22.6 28.1-29.1 44.6-6.2 16-10.5 34.3-11.7 61.2C4.4 179 4.1 187.6 4.1 256s.3 77 1.5 103.9c1.2 26.8 5.5 45.1 11.7 61.2 6.4 16.6 15.1 30.6 29.1 44.6 14 14 28.1 22.6 44.6 29.1 16 6.2 34.3 10.5 61.2 11.7 26.9 1.2 35.4 1.5 103.9 1.5s77-.3 103.9-1.5c26.8-1.2 45.1-5.5 61.2-11.7 16.6-6.4 30.6-15.1 44.6-29.1 14-14 22.6-28.1 29.1-44.6 6.2-16 10.5-34.3 11.7-61.2 1.2-26.9 1.5-35.4 1.5-103.9s-.3-77-1.5-103.9c-1.2-26.8-5.5-45.1-11.7-61.2-6.4-16.6-15.1-30.6-29.1-44.6-14-14-28.1-22.6-44.6-29.1-16-6.2-34.3-10.5-61.2-11.7-27-1.1-35.6-1.4-104-1.4z"></path>
                      <path d="M256 126.6c-71.4 0-129.4 57.9-129.4 129.4s58 129.4 129.4 129.4 129.4-58 129.4-129.4-58-129.4-129.4-129.4zm0 213.4c-46.4 0-84-37.6-84-84s37.6-84 84-84 84 37.6 84 84-37.6 84-84 84z"></path>
                      <circle cx="390.5" cy="121.5" r="30.2"></circle>
                    </svg>
                    <span class="icon__fallback-text">Instagram</span>
                  </a>
                </li>
                <li class="social-icons__item">
                  <a
                    class="social-icons__link"
                    href="https://youtube.com/picframe.in"
                    aria-describedby="a11y-external-message"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      class="icon icon-youtube"
                      viewBox="0 0 21 20"
                    >
                      <path
                        fill="#444"
                        d="M-.196 15.803q0 1.23.812 2.092t1.977.861h14.946q1.165 0 1.977-.861t.812-2.092V3.909q0-1.23-.82-2.116T17.539.907H2.593q-1.148 0-1.969.886t-.82 2.116v11.894zm7.465-2.149V6.058q0-.115.066-.18.049-.016.082-.016l.082.016 7.153 3.806q.066.066.066.164 0 .066-.066.131l-7.153 3.806q-.033.033-.066.033-.066 0-.098-.033-.066-.066-.066-.131z"
                      ></path>
                    </svg>
                    <span class="icon__fallback-text">YouTube</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="grid__item small--one-whole  site-footer-item-align-right mm-copyright-section">
              <small class="site-footer__copyright-content">
                © 2021,{" "}
                <a href="/" title="">
                  PICFRAME
                </a>
              </small>
              <small class="site-footer__copyright-content site-footer__copyright-content--powered-by">
                <a
                  target="_blank"
                  rel="nofollow noopener"
                  href="https://www.shopify.com?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore"
                  aria-describedby="a11y-new-window-external-message"
                >
                  | Museum Quality Picture Frames
                </a>
              </small>
            </div>
          </div>
        </div>
      </footer>
        );
    }
}
export default Footer;

