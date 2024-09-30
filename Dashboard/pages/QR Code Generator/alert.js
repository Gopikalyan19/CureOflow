let drugInventory = [];

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const drugListDiv = document.querySelector("#drug-list");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const drugName = document.querySelector("#drug-name").value;
        const quantity = parseInt(document.querySelector("#quantity").value);
        const expirationDate = document.querySelector("#expiration-date").value;
        const unitPrice = parseFloat(document.querySelector("#unit-price").value);
        const totalValue = quantity * unitPrice;
        document.querySelector("#total-value").value = totalValue.toFixed(2);
        const drugItem = {
            name: drugName,
            quantity: quantity,
            expirationDate: expirationDate,
            unitPrice: unitPrice,
            totalValue: totalValue
        };
        drugInventory.push(drugItem);
        displayDrugList();
    });

    function displayDrugList() {
        drugListDiv.innerHTML = "";
        drugInventory.forEach(function(drugItem) {
            const drugItemDiv = document.createElement("div");
            drugItemDiv.className = "drug-item";
            const drugNameSpan = document.createElement("span");
            drugNameSpan.textContent = drugItem.name;
            drugItemDiv.appendChild(drugNameSpan);
            const quantitySpan = document.createElement("span");
            quantitySpan.textContent = `Quantity: ${drugItem.quantity}`;
            drugItemDiv.appendChild(quantitySpan);
            const expirationDateSpan = document.createElement("span");
            expirationDateSpan.textContent = `Expiration Date: ${drugItem.expirationDate}`;
            drugItemDiv.appendChild(expirationDateSpan);
            const unitPriceSpan = document.createElement("span");
            unitPriceSpan.textContent = `Unit Price: $${drugItem.unitPrice.toFixed(2)}`;
            drugItemDiv.appendChild(unitPriceSpan);
            const totalValueSpan = document.createElement("span");
            totalValueSpan.textContent = `Total Value: $${drugItem.totalValue.toFixed(2)}`;
            drugItemDiv.appendChild(totalValueSpan);
            if (isExpired(drugItem.expirationDate)) {
                drugItemDiv.className += " expired";
            }
            if (isLowQuantity(drugItem.quantity)) {
                drugItemDiv.className += " low-quantity";
            }
            if (isHighValue(drugItem.totalValue)) {
                drugItemDiv.className += " high-value";
            }
            drugListDiv.appendChild(drugItemDiv);
        });
    }

    function isExpired(expirationDate) {
        const today = new Date();
        const expirationDateObject = new Date(expirationDate);
        return today > expirationDateObject;
    }

    function isLowQuantity(quantity) {
        return quantity <= 10;
    }

    function isHighValue(totalValue) {
        return totalValue > 100;
    }
});