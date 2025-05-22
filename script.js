document.addEventListener("DOMContentLoaded", () => {
  const openModelBtn = document.querySelector("#openModelBtn");
  const employeeModel = document.querySelector("#employeeModel");
  const employeeform = document.querySelector("#employeeform");
  const employeelist = document.querySelector("#employeelist");
  const employeeinfo = document.querySelector("#employeeinfo");

  openModelBtn.addEventListener("click", () => {
    employeeModel.classList.remove("hidden");
  });

  employeeModel.addEventListener("click", (e) => {
    if (e.target === employeeModel) {
      employeeModel.classList.add("hidden");
    }
    
   
  });

  employeeform.addEventListener("submit", (e) => {
    e.preventDefault();


    const formData = new FormData(employeeform);
    // ✅ Handle image file (local preview)
    const imageFile = formData.get("imageFile");
    let imageUrl = "https://via.placeholder.com/250";
    if (imageFile && imageFile.size > 0) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const employee = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
        imageUrl,
      age: formData.get("age"),
      contact: formData.get("contactNumber"),
      salary: formData.get("salary"),
      address: formData.get("address"),
      dob: formData.get("dob"),
    };

    // Create list item
    const employeeItem = document.createElement("div");
    employeeItem.className =
      "cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-300 rounded flex justify-between items-center";

    // Name span
    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${employee.firstName} ${employee.lastName}`;

    // ❌ Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.className =
      "ml-2 text-red-500 hover:text-red-700 font-bold";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering the info view
      if (confirm("Remove this employee?")) {
        employeeItem.remove();
        const shownName = document.querySelector("#employeeinfo h2")?.textContent?.trim().toUpperCase();
        const thisName = `${employee.firstName} ${employee.lastName}`.trim().toUpperCase();
  
        if (shownName === thisName) {
          employeeinfo.innerHTML = "";
        }
      }
     
    });

    // Attach click to whole item
    employeeItem.addEventListener("click", () => {
      showEmployeeInfo(employee);
    });

    // Assemble
    employeeItem.appendChild(nameSpan);
    employeeItem.appendChild(removeBtn);
    employeelist.appendChild(employeeItem);

    employeeform.reset();
    employeeModel.classList.add("hidden");
  });

  function showEmployeeInfo(employee) {
    employeeinfo.innerHTML = `
      <h2 class="text-2xl uppercase">Employee Details</h2>
      <img src="${employee.imageUrl}" class="w-[250px] h-[250px] object-contain rounded-full" />
       <h2 class="text-2xl uppercase">${employee.firstName} ${employee.lastName}</h2>
      <p><strong>Email:</strong> ${employee.email}</p>
      <p><strong>Age:</strong> ${employee.age}</p>
      <p><strong>Contact:</strong> ${employee.contact}</p>
      <p><strong>Salary:</strong> ₹${employee.salary}</p>
      <p><strong>Address:</strong> ${employee.address}.</p>
      <p><strong>DOB:</strong> ${employee.dob}</p>`;
  }
})

//CODE END


// });


  // document.addEventListener("DOMContentLoaded", () => {
  //   const openModelBtn = document.querySelector("#openModelBtn");
  //   const employeeModel = document.querySelector("#employeeModel");
  //   const employeeform = document.querySelector("#employeeform");
  //   const employeelist = document.querySelector("#employeelist");
  //   const employeeinfo = document.querySelector("#employeeinfo");

  //   openModelBtn.addEventListener("click", () => {
  //     employeeModel.classList.remove("hidden");
  //   });

  //   employeeModel.addEventListener("click", (e) => {
  //     if (e.target === employeeModel) {
  //       employeeModel.classList.add("hidden");
  //     }
  //   });

  //   employeeform.addEventListener("submit", async (e) => {
  //     e.preventDefault();

  //     const formData = new FormData(employeeform);
  //     const imageFile = formData.get("imageFile");
  //     let imageUrl = "https://via.placeholder.com/250";
  //     if (imageFile && imageFile.size > 0) {
  //       imageUrl = URL.createObjectURL(imageFile);
  //     }

  //     const employee = {
  //       firstName: formData.get("firstName"),
  //       lastName: formData.get("lastName"),
  //       email: formData.get("email"),
  //       imageUrl,
  //       age: formData.get("age"),
  //       contact: formData.get("contactNumber"),
  //       salary: formData.get("salary"),
  //       address: formData.get("address"),
  //       dob: formData.get("dob"),
  //     };

  //     try {
  //       const response = await fetch(employeeform.action, {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const result = await response.json();

  //       if (result.result === "Success") {
  //         alert("✅ Employee added to Google Sheet");

  //         // Add to DOM
  //         const employeeItem = document.createElement("div");
  //         employeeItem.className =
  //           "cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-300 rounded flex justify-between items-center";

  //         const nameSpan = document.createElement("span");
  //         nameSpan.textContent = `${employee.firstName} ${employee.lastName}`;

  //         const removeBtn = document.createElement("button");
  //         removeBtn.textContent = "❌";
  //         removeBtn.className =
  //           "ml-2 text-red-500 hover:text-red-700 font-bold";
  //         removeBtn.addEventListener("click", (e) => {
  //           e.stopPropagation();
  //           if (confirm("Remove this employee?")) {
  //             employeeItem.remove();
  //             const shownName = document.querySelector("#employeeinfo h2")
  //               ?.textContent?.trim()
  //               .toUpperCase();
  //             const thisName = `${employee.firstName} ${employee.lastName}`
  //               .trim()
  //               .toUpperCase();

  //             if (shownName === thisName) {
  //               employeeinfo.innerHTML = "";
  //             }
  //           }
  //         });

  //         employeeItem.addEventListener("click", () => {
  //           showEmployeeInfo(employee);
  //         });

  //         employeeItem.appendChild(nameSpan);
  //         employeeItem.appendChild(removeBtn);
  //         employeelist.appendChild(employeeItem);

  //         employeeform.reset();
  //         employeeModel.classList.add("hidden");
  //       } else {
  //         alert("❌ Error: " + result.message);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       alert("❌ Failed to submit to Google Sheets");
  //     }
  //   });

  //   function showEmployeeInfo(employee) {
  //     employeeinfo.innerHTML = `
  //       <h2 class="text-2xl uppercase">Employee Details</h2>
  //       <img src="${employee.imageUrl}" class="w-[250px] h-[250px] object-contain rounded-full" />
  //       <h2 class="text-2xl uppercase">${employee.firstName} ${employee.lastName}</h2>
  //       <p><strong>Email:</strong> ${employee.email}</p>
  //       <p><strong>Age:</strong> ${employee.age}</p>
  //       <p><strong>Contact:</strong> ${employee.contact}</p>
  //       <p><strong>Salary:</strong> ₹${employee.salary}</p>
  //       <p><strong>Address:</strong> ${employee.address}</p>
  //       <p><strong>DOB:</strong> ${employee.dob}</p>`;
  //   }
  // });

