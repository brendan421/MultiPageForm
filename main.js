const tab1 = document.getElementById("tab-item-1");
const tab2 = document.getElementById("tab-item-2");
const tab3 = document.getElementById("tab-item-3");
const tab4 = document.getElementById("tab-item-4");

const page1 = document.getElementById("form-page-1");
const page2 = document.getElementById("form-page-2");
const page3 = document.getElementById("form-page-3");
const page4 = document.getElementById("form-page-4");

const errorMessage = document.getElementById("error-message");

const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");

const tabs = [tab1, tab2, tab3, tab4];
const pages = [page1, page2, page3, page4];

let iCurrentPage = 0;

tab1.addEventListener("click", function(e) {
  setPage(0);
});

tab2.addEventListener("click", function(e) {
  setPage(1);
});

tab3.addEventListener("click", function(e) {
  setPage(2);
});

tab4.addEventListener("click", function(e) {
  setPage(3);
});

backButton.addEventListener("click", function() {
  if (iCurrentPage > 0) {
    iCurrentPage--;
    setPage(iCurrentPage);
  }
});

nextButton.addEventListener("click", function() {
  if (iCurrentPage < 3) {
    setPage(iCurrentPage + 1);
  } else if (iCurrentPage === 3) {
    if (validatePage(iCurrentPage)) {
      // we're in submit mode
      alert("Congratulations. You have joined the Matt Demon Flight School");
    }
  }
});

// initialize
setPage(0);

function validatePage(iPageNum) {
  let errMsg = "";
  let retVal = true;

  switch (iPageNum) {
    case 0:
      const name = document.getElementById("name").value;
      const zipCode = document.getElementById("zip-code").value;
      if (name.length < 3 || zipCode.length < 6) {
        // normally do a zipcode validation here
        errMsg = "Missing name or zip code";
        retVal = false;
      }
      break;
    case 1:
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      if (email.length < 6 || phone.length < 10) {
        // normally do a full email check here and phone format check
        errMsg = "Missing email or phone number";
        retVal = false;
      }
      break;
    case 2:
      const reason = document.getElementById("reason").value;
      if (reason.length < 20) {
        // normally do a full email check here and phone format check
        errMsg =
          "Reason for wanting to take this trip must be at least 20 characters";
        retVal = false;
      }
      break;
    case 3:
      const bAcceptConditions = document.getElementById("accept-conditions")
        .checked;
      const bAcceptPayment = document.getElementById("accept-payment").checked;
      console.log("Accept " + bAcceptConditions + ". Pay: " + bAcceptPayment);
      if (!bAcceptConditions || !bAcceptPayment) {
        errMsg = "You must accept conditions and agree to pay";
        retVal = false;
      }
      break;
  }
  errorMessage.innerText = errMsg;
  return retVal;
}

function setPage(iPageNum) {
  let i;
  errorMessage.innerText = "";

  // run the validation if going forward
  if (iPageNum > iCurrentPage) {
    for (i = 0; i < iPageNum; i++) {
      if (!validatePage(i)) {
        // go to the incomplete page
        iPageNum = i;
        break;
      }
    }
  }

  // now cylce through the tabs and pages selecting the one to display and hiding others
  for (i = 0; i < 4; i++) {
    if (i === iPageNum) {
      tabs[i].classList.remove("tab-unselected");
      tabs[i].classList.add("tab-selected");
      pages[i].classList.remove("hide-form");
    } else {
      tabs[i].classList.remove("tab-selected");
      tabs[i].classList.add("tab-unselected");

      pages[i].classList.add("hide-form");
    }
    // now deal with the buttons for first and last pages
    if (iPageNum === 0) {
      backButton.classList.add("hide-button");
      // no "back" button
    } else {
      backButton.classList.remove("hide-button");
    }
    if (iPageNum === 3) {
      // change next to submit
      nextButton.innerText = "Submit";
    } else {
      nextButton.innerText = "Next";
    }
  }
  iCurrentPage = iPageNum;
}
