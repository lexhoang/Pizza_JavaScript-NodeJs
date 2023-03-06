/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gBASE_URL = "/devcamp-pizza365/orders";

var gAllOrder = [];
var gOrder = {};

var gOrderId = "";
var gId = "";

var gVoucherID = [];
var gThanhTien = [];

var gCombo = [{
    kichCo: "S",
    duongKinh: "20cm",
    suon: 2,
    salad: 200,
    soLuongNuoc: 2,
    thanhTien: 150000,
}, {
    kichCo: "M",
    duongKinh: "25cm",
    suon: 4,
    salad: 300,
    soLuongNuoc: 3,
    thanhTien: 200000,
}, {
    kichCo: "L",
    duongKinh: "30cm",
    suon: 8,
    salad: 500,
    soLuongNuoc: 4,
    thanhTien: 250000,
}]
//--------------------------------------------//


const gOrderData = ["STT", "orderCode", "kichCo", "loaiPizza", "maNuocUong", "thanhTien", "hoTen", "soDienThoai", "trangThai", "chitiet"];
const gSTT = 0;
const gORDER_ID_COL = 1;
const gKICH_CO_COL = 2;
const gLOAI_PIZZA_COL = 3;
const gNUOC_UONG_COL = 4;
const gTHANH_TIEN_COL = 5;
const gHO_TEN_COL = 6;
const gSDT_COL = 7;
const gTRANG_THAI_COL = 8;
const gACTION = 9;

var gStt = 1;

var gOrderTable = $("#pizza-table").DataTable({
    columns: [{
        data: gOrderData[gSTT]
    }, {
        data: gOrderData[gORDER_ID_COL]
    }, {
        data: gOrderData[gKICH_CO_COL]
    }, {
        data: gOrderData[gLOAI_PIZZA_COL]
    }, {
        data: gOrderData[gNUOC_UONG_COL]
    }, {
        data: gOrderData[gTHANH_TIEN_COL]
    }, {
        data: gOrderData[gHO_TEN_COL]
    }, {
        data: gOrderData[gSDT_COL]
    }, {
        data: gOrderData[gTRANG_THAI_COL]
    }, {
        data: gOrderData[gACTION]
    }],
    columnDefs: [{
        targets: gSTT,
        className: "d-lg-none",
        render: function () {
            return gStt++
        }
    }, {
        targets: gACTION,
        defaultContent: `
    <i class="fa-solid fa-pen-to-square text-success btn-edit mr-4" data-toggle="tooltip" title="Cập nhật trạng thái" style="cursor: pointer;"></i>
    <i class="fa-regular fa-trash-can text-danger btn-delete" data-toggle="tooltip" title="Xóa" style="cursor: pointer;"></i>
    `

    }]
})
//--------------------------------------------//



/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */

$(document).ready(function () {

    // call api lấy tất cả order
    callApiGetAllOrder();
    //call api lấy các loại nước uống
    callApiGetDrink();
    // // load lại bảng
    // loadDataIntoTable(gAllOrder);
});


//FILTER
$("#btn-filter").click(function () {
    onBtnFilterClick();
});


// Add New
//  C: Gán sự kiện Create - Thêm mới
$("#addnew-order").click(function () {
    onBtnAddNewClick();
});

// gán sự kiện cho nút Create (trên modal)
$("#btn-create-order").click(function () {
    onBtnCreateClick();
});


//UP DATE
// U: gán sự kiện Update - Sửa
$(document).on("click", ".btn-edit", function () {
    onBtnEditClick(this);
});

// gán sự kiện cho nút Update (trên modal)
$("#btn-update-confirm").click(function () {
    onBtnUpdateClick();
});


//DELETE
// // D: gán sự kiện Delete - Xóa
$(document).on("click", ".btn-delete", function () {
    onBtnDeleteClick(this);
});

// gán sự kiện cho nút Delete (trên modal)
$("#btn-modal-delete").click(function () {
    onBtnDeleteModalClick();
});
//--------------------------------------------//



/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */


///////////////////            FILTER      ////////////////
function onBtnFilterClick() {

    var vDataFilter = {
        trangThai: "",
        loaiPizza: ""
    }
    // lấy dữ liệu từ ô select
    getDataOrderFilter(vDataFilter);
    // kiểm tra
    // lọc dữ liệu
    var vFilter = filterOrder(vDataFilter); -
    // hiển thị ra bảng
    loadDataIntoTable(vFilter)
}

// hàm lấy thông tin từ ô select
function getDataOrderFilter(paramDataFilter) {
    paramDataFilter.trangThai = $("#select-status").val();
    paramDataFilter.loaiPizza = $("#select-pizza").val();
    console.log(paramDataFilter)
}
// lọc dữ liệu
function filterOrder(paramDataFilter) {
    var vOrderFilter = [];
    vOrderFilter = gAllOrder.filter(function (paramOrder) {
        if (paramOrder.trangThai != null && paramOrder.loaiPizza != null) {
            // debugger;
            return ((paramOrder.trangThai.includes(paramDataFilter.trangThai) || paramDataFilter.trangThai == "none") &&
                (paramOrder.loaiPizza.includes(paramDataFilter.loaiPizza) || paramDataFilter.loaiPizza == "none"));
        }
    });
    return vOrderFilter;
}
//--------------------------------------------//





/////////////////////////////////           ADD NEW    AND    CREATE      /////////////////////////////


/////////  ADD NEW  /////////
//Hàm xử lý sự kiện addnew
function onBtnAddNewClick() {

    $("#insert-order-modal").modal("show");
}

////////////  gắn giá trị cho các ô input khị chọn size pizza//////////

// hàm chuyển đổi khi select kích cỡ thay đổi
$("#inp-create-kichCo").on("change", function () {

    // hàm gán dữ liệu vào ô input
    addDataToInput()
})

// hàm gán dữ liệu vào ô input
function addDataToInput() {

    for (var i = 0; i < gCombo.length; i++) {
        debugger;
        if ($("#inp-create-kichCo").val() === "none") {
            $("#inp-create-duong-kinh").val("");
            $("#inp-create-suon").val("");
            $("#inp-create-salad").val("");
            $("#inp-create-soLuongNuoc").val("");
            $("#inp-create-thanhTien").val("");
        }

        if ($("#inp-create-kichCo").val() === gCombo[i].kichCo) {
            $("#inp-create-duong-kinh").val(gCombo[i].duongKinh);
            $("#inp-create-suon").val(gCombo[i].suon);
            $("#inp-create-salad").val(gCombo[i].salad);
            $("#inp-create-soLuongNuoc").val(gCombo[i].soLuongNuoc);
            $("#inp-create-thanhTien").val(gCombo[i].thanhTien);
            gThanhTien = gCombo[i].thanhTien;

        }
    }
}

////////////      Tự giảm tiền khi thêm đúng voucher      ////////////////

$("#inp-create-idVourcher").on('input', function () {

    readDataVoucher();
    if (gVoucherID.length >= 5) {
        callApiVoucher();
    }
})

//Đọc dữ liệu Voucher
function readDataVoucher() {
    gVoucherID = $("#inp-create-idVourcher").val();
}
//Call API
function callApiVoucher() {
    $.ajax({
        url: "/voucherCode?maVoucher="+ gVoucherID,
        type: "GET",
        dataType: "json",
        async: false,
        success: function (res) {
            console.log(res);
            handleDiscount(res);
        },
        error: function (error) {
            console.log(error);
            alert("Mã voucher sai vui lòng nhập lại!");
            $("#create-discount").val("0 VND");
        }
    })
}
//Hàm xử lý tính tiền
function handleDiscount(paramdiscount) {
    var vDiscount = paramdiscount.data.phanTramGiamGia;
    var vGiamGia = vDiscount;
    $("#create-discount").val(vGiamGia);
}
//--------------------------------------------//


///////   CREATE  /////////
////Hàm xử lý sự kiện create
function onBtnCreateClick() {

    var vNewOrder = {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        kichCo: "",
        duongKinh: "",
        suon: "",
        salad: "",
        loaiPizza: "",
        maVoucher: "",
        giamGia: "",
        thanhTien: "",
        maNuocUong: "",
        soLuongNuoc: "",
        loiNhan: "",
        trangThai: "open"
    }

    // thu thập dữ liệu
    getDataInsertOrder(vNewOrder);

    // kiểm tra thông tin đơn hàng
    var vValidate = validateOrder(vNewOrder);

    if (vValidate) {

        // call api tạo mới order
        callAPiCreateOrder(vNewOrder);

        // call api lấy danh sách order mới
        callApiGetAllOrder()

        // load lại bảng
        loadDataIntoTable(gAllOrder)

        $("#insert-order-modal").modal("hide");
    }
}

// hàm thu thập dữ liệu tạo order mới
function getDataInsertOrder(paramNewOrder) {

    paramNewOrder.kichCo = $("#inp-create-kichCo").val().trim();
    paramNewOrder.duongKinh = $("#inp-create-duong-kinh").val().trim();
    paramNewOrder.suon = $("#inp-create-suon").val().trim();
    paramNewOrder.salad = $("#inp-create-salad").val().trim();
    paramNewOrder.loaiPizza = $("#inp-create-loaiPizza").val().trim();
    paramNewOrder.maVoucher = $("#inp-create-idVourcher").val().trim();
    paramNewOrder.maNuocUong = $("#inp-create-idLoaiNuocUong").val().trim();
    paramNewOrder.soLuongNuoc = $("#inp-create-soLuongNuoc").val().trim();
    paramNewOrder.fullName = $("#inp-create-hoTen").val().trim();
    paramNewOrder.thanhTien = $("#inp-create-thanhTien").val().trim();
    paramNewOrder.email = $("#inp-create-email").val().trim();
    paramNewOrder.phone = $("#inp-create-soDienThoai").val().trim();
    paramNewOrder.address = $("#inp-create-dia-chi").val().trim();
    paramNewOrder.loiNhan = $("#inp-create-loiNhan").val().trim();
    paramNewOrder.giamGia = $("#create-discount").val().trim();
}

// hàm kiểm tra thông tin trước khi tạo order
function validateOrder(paramOrderConfirm) {
    console.log(paramOrderConfirm)
    if (paramOrderConfirm.kichCo == "none") {
        alert("hãy nhập chọn kích cỡ!");
        return false;
    }
    if (paramOrderConfirm.loaiPizza == "none") {
        alert("hãy nhập chọn loại pizza!");
        return false;
    }
    if (paramOrderConfirm.maVoucher != "") {
        if (isNaN(paramOrderConfirm.maVoucher)) {
            alert("hãy nhập mã voucher là số!");
            return false;
        }
    }
    if (paramOrderConfirm.maNuocUong == "none") {
        alert("hãy nhập chọn loại nước uống!");
        return false;
    }
    if (isNaN(paramOrderConfirm.fullName) == false || paramOrderConfirm.fullName == "") {
        alert("hãy nhập tên của bạn!");
        return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(paramOrderConfirm.email)) {} else {
        alert("hãy nhập emaill đúng!")
        return false;
    }
    if (paramOrderConfirm.phone == "" || isNaN(paramOrderConfirm.phone) == true) {
        alert("hãy nhập số điện thoại!");
        return false;
    }
    if (paramOrderConfirm.address == "") {
        alert("hãy nhập địa chỉ!");
        return false;
    }
    return true
}

// call api tạo mới order
function callAPiCreateOrder(paramNewOrder) {
    $.ajax({
        url: "/devcamp-pizza365/orders?email=" + paramNewOrder.email,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(paramNewOrder),
        success: function (response) {
            console.log(response)

            location.reload();
        },
        error: function (error) {
            console.log(error.status)
        }
    })
}
//--------------------------------------------//




////////////////////////////////           EDIT    AND    UPDATE          ///////////////////////////////

///// Hàm sự kiện nút EDIT  //////
function onBtnEditClick(paramData) {

    // lấy order id và id của order
    getOrderIdAndId(paramData);
    // call api lấy thông tin order
    callApiGetDataOrder();
    // hiện modal
    $("#detail-order-modal").modal("show");
}
// call api lấy thông tin order
function callApiGetDataOrder() {

    $.ajax({
        url: "/orders/" + gId,
        type: "GET",
        success: function (response) {
            console.log(response)
            gOrder = response;
            // hiển thị thông tin lên modal
            showDataOrderDetailToModal(response);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })
}

// hiển thị thông tin lên modal
function showDataOrderDetailToModal(paramOrderDetail) {

    $("#inp-update-kichCo").val(paramOrderDetail.data.kichCo);
    $("#inp-update-duong-kinh").val(paramOrderDetail.data.duongKinh);
    $("#inp-update-orderId").val(paramOrderDetail.data.orderCode);
    $("#inp-update-suon").val(paramOrderDetail.data.suon);
    $("#inp-update-salad").val(paramOrderDetail.data.salad);
    $("#inp-update-loaiPizza").val(paramOrderDetail.data.loaiPizza);
    $("#inp-update-idVourcher").val(paramOrderDetail.data.maVoucher);
    $("#inp-update-idLoaiNuocUong").val(paramOrderDetail.data.maNuocUong);
    $("#inp-update-soLuongNuoc").val(paramOrderDetail.data.soLuongNuoc);
    $("#inp-update-giamGia").val(paramOrderDetail.data.giamGia);
    $("#inp-update-thanhTien").val(paramOrderDetail.data.thanhTien);
    $("#inp-update-hoTen").val(paramOrderDetail.data.hoTen);
    $("#inp-update-email").val(paramOrderDetail.data.email);
    $("#inp-update-dia-chi").val(paramOrderDetail.data.diaChi);
    $("#inp-update-soDienThoai").val(paramOrderDetail.data.soDienThoai);
    $("#inp-update-loiNhan").val(paramOrderDetail.data.loiNhan);
    $("#inp-update-ngayTao").val((paramOrderDetail.data.ngayTao));
    $("#inp-update-ngayCapNhat").val((paramOrderDetail.data.ngayCapNhat));
    $("#inp-update-trangThai").val(paramOrderDetail.data.trangThai);
}
//--------------------------------------------//


//// Hàm sự kiện nút UPDATE  ////
function onBtnUpdateClick() {

    var vObjectRequest = {
        trangThai: ""
    }

    // thu thập thông tin order update trạng thái
    getDataOrderByModal(vObjectRequest);

    // gọi api confirm order
    callApiUpdateOrder(vObjectRequest);

    // call api lấy danh sách order mới
    callApiGetAllOrder()

    // load lại bảng
    loadDataIntoTable(gAllOrder)

    $("#detail-order-modal").modal("hide");

}

// hàm lấy thông tin order dựa vào modal
function getDataOrderByModal(paramTrangThai) {
    paramTrangThai.trangThai = $("#inp-update-trangThai").val();
}

// call api confirm order
function callApiUpdateOrder(paramTrangThai) {
    console.log(paramTrangThai);
    console.log(gId)
    $.ajax({
        url: "/orders/" + gId,
        type: "PUT",
        async: false,
        contentType: "application/json",
        data: JSON.stringify(paramTrangThai),
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            alert(error.message);
            console.log(error.status);
        }
    })
}
//--------------------------------------------//



////////////////////////////////           DELETE            ///////////////////////////////

///// Hàm sự kiện nút xóa ///
function onBtnDeleteClick(paramData) {

    // lấy order id và id của order
    getOrderIdAndId(paramData);

    $("#delete-order-modal").modal("show")
}

///// Hàm sự kiện nút xóa trong modal ///
function onBtnDeleteModalClick() {

    // call api xóa order
    callApiDeleteOrder();

    // call api lấy danh sách order mới
    callApiGetAllOrder()

    // load lại bảng
    loadDataIntoTable(gAllOrder)

    $("#delete-order-modal").modal("hide")
}

// call api xóa order
function callApiDeleteOrder() {

    $.ajax({
        url: "/orders/" + gId,
        type: "DELETE",
        success: function (response) {
            console.log(response)
            alert("Xóa thành công")
            location.reload();
        },
        error: function (error) {
            console.log(error.status)
        }
    })
}

//////  LẤY THÔNG TIN QUA ORDER ID VÀ ID  --   DÙNG CHO UPDATE VÀ DELETE////
// lấy order id và id của order
function getOrderIdAndId(paramOrder) {
    var vCourseChange = gOrderTable.row($(paramOrder).parents("tr")).data();
    // gOrderId = vCourseChange.orderId;
    gId = vCourseChange._id;
    console.log(vCourseChange)
    // console.log("orderID: " + gOrderId);
    console.log("ID: " + gId);
}
//--------------------------------------------//



/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/


/////////////////////////////////////////        CÁC HÀM LOAD DÙNG CHUNG                ////////////////////////////////////////

// hàm hiện thông tin lên bảng
function loadDataIntoTable(paramCourse) {
    //Xóa toàn bộ dữ liệu đang có của bảng
    gOrderTable.clear();

    //Cập nhật data cho bảng
    gOrderTable.rows.add(paramCourse);

    //Cập nhật lại giao diện hiển thị bảng
    gOrderTable.draw();
}

// call api get all order
function callApiGetAllOrder() {
    $.ajax({
        url: "/orders",
        type: "GET",
        dataType: 'json',
        success: function (response) {
            gAllOrder = response.data;
            loadDataIntoTable(gAllOrder)
        },
        error: function (error) {
            console.log(error.status)
        }
    })
}
//--------------------------------------------//



//////////////////          LOAD ĐỒ UỐNG         ///////////////////

// Call API đổ dữ liệu vào select drink
function callApiGetDrink() {
    $.ajax({
        url: "/drinks",
        type: "GET",
        dataType: "json",
        success: function (response) {
            loadDataDirkToSelect(response.data);
        },
        error: function (error) {
            console.log(error.status)
        }
    })
}

// hàm load dữ liệu nước uống vào select'
function loadDataDirkToSelect(paramDrink) {
    $("#inp-create-idLoaiNuocUong").append(`<option value="none">Hãy chọn loại đồ uống</option>`)
    for (var i = 0; i < paramDrink.length; i++) {
        $("#inp-create-idLoaiNuocUong").append(`<option value="${paramDrink[i].maNuocUong}">${paramDrink[i].tenNuocUong}</option>`)
    }
}
//-----------------------------------------/////