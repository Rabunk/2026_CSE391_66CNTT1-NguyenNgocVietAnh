const form = document.getElementById("orderForm");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const deliveryDate = document.getElementById("deliveryDate");
const address = document.getElementById("address");
const note = document.getElementById("note");
const totalPrice = document.getElementById("totalPrice");
const confirmBox = document.getElementById("confirmBox");
const successMessage = document.getElementById("successMessage");
const charCount = document.getElementById("charCount");
const prices = {
    ao:150000,
    quan:200000,
    giay:500000
};

function showError(id,msg){
    document.getElementById(id).textContent=msg;
}

function clearError(id){
    document.getElementById(id).textContent="";
}

function validateProduct(){
    if(product.value===""){
        showError("productError","Phải chọn sản phẩm");
        return false;
    }
    clearError("productError");
    return true;
}

function validateQuantity(){
    const q=Number(quantity.value);
    if(!Number.isInteger(q)||q<1||q>99){
        showError("quantityError","Số lượng 1-99");
        return false;
    }
    clearError("quantityError");
    return true;
}

function validateDate(){
    const value=deliveryDate.value;
    if(!value){
        showError("dateError","Phải chọn ngày giao");
        return false;
    }
    const today=new Date();
    const chosen=new Date(value);
    const max=new Date();
    max.setDate(today.getDate()+30);
    if(chosen<today){
        showError("dateError","Không được chọn ngày quá khứ");
        return false;
    }
    if(chosen>max){
        showError("dateError","Không quá 30 ngày");
        return false;
    }
    clearError("dateError");
    return true;
}

function validateAddress(){
    if(address.value.trim().length<10){
        showError("addressError","Địa chỉ ≥10 ký tự");
        return false;
    }
    clearError("addressError");
    return true;
}

function validateNote(){
    if(note.value.length>200){
        showError("noteError","Không quá 200 ký tự");
        return false;
    }
    clearError("noteError");
    return true;
}

function validatePayment(){
    const p=document.querySelector('input[name="payment"]:checked');
    if(!p){
        showError("paymentError","Chọn phương thức thanh toán");
        return false;
    }
    clearError("paymentError");
    return true;
}

note.addEventListener("input",function(){
    const len=note.value.length;
    charCount.textContent=len;
    if(len>200){
        charCount.style.color="red";
    }else{
        charCount.style.color="black";
    }
    validateNote();
});

function updateTotal(){
    const p=product.value;
    const q=Number(quantity.value);
    if(prices[p]&&q){
        const total=prices[p]*q;
        totalPrice.textContent=total.toLocaleString("vi-VN");
    }
}

product.addEventListener("change",updateTotal);
quantity.addEventListener("input",updateTotal);
product.addEventListener("blur",validateProduct);
quantity.addEventListener("blur",validateQuantity);
deliveryDate.addEventListener("blur",validateDate);
address.addEventListener("blur",validateAddress);
product.addEventListener("input",()=>clearError("productError"));
quantity.addEventListener("input",()=>clearError("quantityError"));
address.addEventListener("input",()=>clearError("addressError"));

form.addEventListener("submit",function(e){
    e.preventDefault();
    const valid=
        validateProduct() &
        validateQuantity() &
        validateDate() &
        validateAddress() &
        validateNote() &
        validatePayment();
    if(!valid) return;
    const productName=product.options[product.selectedIndex].text;
    const q=quantity.value;
    const price=totalPrice.textContent;
    const date=deliveryDate.value;
    confirmBox.style.display="block";
    confirmBox.innerHTML=`
    <b>Xác nhận đặt hàng?</b><br><br>
    Sản phẩm: ${productName}<br>
    Số lượng: ${q}<br>
    Tổng tiền: ${price} VND<br>
    Ngày giao: ${date}<br><br>
    <button id="confirmBtn" class="btn btn-success">Xác nhận</button>
    <button id="cancelBtn" class="btn btn-secondary">Hủy</button>
    `;
    document.getElementById("confirmBtn").onclick=function(){
        confirmBox.style.display="none";
        form.style.display="none";
        successMessage.style.display="block";
        successMessage.textContent="Đặt hàng thành công 🎉";
    }
    document.getElementById("cancelBtn").onclick=function(){
        confirmBox.style.display="none";
    }
});