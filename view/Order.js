    "use strict";

    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

    // Biến lưu trữ combo được chọn, mỗi khi khách chọn bạn lại đổi giá trị properties của nó
    var gSelectedMenuStructure = {
        menuName: "...", // S, M, L
        duongKinhCM: "",
        suonNuong: "",
        saladGr: 0,
        drink: "",
        priceVND: 0
    };

    var gSelectedPizzaType = "";

    // Biến toàn cực thông tin người đặt hàng
    const gORDER_USER = {
        fullName: "",
        email: "",
        dienThoai: "",
        diaChi: "",
        message: "",
        maVoucher: "",
        drink: "",
    };

    var gPricesDiscount = {
        discount: "",
        price: ""
    }

    var gDataUserOrder = [];


    // Biến toàn cực đơn hàng
    const gObjectRequest = {
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
    };


    /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
    $(document).ready(function () {

        onPageLoading()

    });

    /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */

    // Hàm load trang
    function onPageLoading() {
        "use strict";
        //CALL API ĐỔ DỮ LIỆU VÀO Ô SELECT DRINK
        $.ajax({
            url: "/drinks",
            method: "GET",
            dataType: "json",
            success: function (responseObj) {
                console.log(responseObj);
                for (let bI = 0; bI < responseObj.data.length; bI++) {
                    $('#select-drink').append($('<option>', {
                        text: responseObj.data[bI].tenNuocUong,
                        value: responseObj.data[bI].maNuocUong

                    }))
                }
                // //CÁCH 2:
                // $.each(responseObj, function(i, item) {
                //     $("#select-drink").append($('<option>', {
                //         text: item.tenNuocUong,
                //         value: item.maNuocUong
                //     }))
                // })
            },
            error: function (ajaxContext) {
                console.log(ajaxContext.responseText);
                alert(ajaxContext.responseText);
            }
        })
    }

    //HÀM SỰ KIỆN KHI NHẤN NÚT CHỌN COMBO

    //Hàm đổi màu nút combo được Chọn
    $('.btn-size').on('click', function(){
        $('.btn-size').removeClass('w3-cyan').addClass('w3-orange');
        $(this).addClass('w3-cyan').removeClass('w3-orange');
    })

    // hàm sự kiện khi nhán nút chọn combo S
    $('#btn-size-s').on('click', function () {
        var vComboS = {
            menuName: "S",
            duongKinhCM: "20cm",
            suonNuong: "2",
            saladGr: 200,
            drink: "2",
            priceVND: 150000
        }
        gSelectedMenuStructure = vComboS;
        console.log(gSelectedMenuStructure);
    })

    // hàm sự kiện khi nhán nút chọn combo M
    $('#btn-size-m').on('click', function () {
        var vComboM = {
            menuName: "M",
            duongKinhCM: "25cm",
            suonNuong: "4",
            saladGr: 300,
            drink: "3",
            priceVND: 200000
        }
        gSelectedMenuStructure = vComboM;
        console.log(gSelectedMenuStructure);
    })

    // hàm sự kiện khi nhán nút chọn combo L
    $('#btn-size-l').on('click', function () {
        var vComboL = {
            menuName: "L",
            duongKinhCM: "30cm",
            suonNuong: "8",
            saladGr: 500,
            drink: "4",
            priceVND: 250000
        }
        gSelectedMenuStructure = vComboL;
        console.log(gSelectedMenuStructure);
    })



    //HÀM SỰ KIỆN KHI NHẤN NÚT CHỌN LOẠI PIZZA

 //Hàm đổi màu nút pizza được Chọn
    $('.btn-pizza').on('click', function(){
        $('.btn-pizza').removeClass('w3-cyan').addClass('w3-orange');
        $(this).addClass('w3-cyan').removeClass('w3-orange');
    })

    // hàm sự kiện khi nhán nút chọn pizza Hải Sản
    $('#btn-hai-san').on('click', function () {
        gSelectedPizzaType = "SEAFOOD";
        console.log(gSelectedPizzaType);
    })

    // hàm sự kiện khi nhán nút chọn pizza Hawai
    $('#btn-hawaii').on('click', function () {
        gSelectedPizzaType = "HAWAIIAN";
        console.log(gSelectedPizzaType);
    })

    // hàm sự kiện khi nhán nút chọn pizza Thịt Xông Khói
    $('#btn-bacon').on('click', function () {
        gSelectedPizzaType = "CHEESY CHICKEN BACON";
        console.log(gSelectedPizzaType);
    })



    //HÀM NÚT GỬI ĐƠN
    $('#btn-gui-don').on('click', function () {

        // B1: Thu thập dữ liệu nhập vào
        getDataOrder(gORDER_USER)

        //B2: Điều kiện
        var vCheckValidate = validateDataUser(gORDER_USER, gSelectedMenuStructure, gSelectedPizzaType)
        if (vCheckValidate) {

            // load dữ liệu vào bảng modal
            loadUserDataToModel(gORDER_USER);

            //CALL API HIỂN THỊ THÔNG TIN ĐẶT HÀNG
            callAPIloadDataOrder()

            //Hiện bảng modal
            $('#order-modal').modal('show');
        }
    });



    //HÀM NÚT TẠO ĐƠN
    $('#btn-tao-don').on('click', function () {
        // lấy dữ liệu order
        getInforOrderData()

        callApiPostData()
    })




    /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/


    //CÁC HÀM NÚT GỬI ĐƠN

    //Hàm điều đọc thông tin User
    function getDataOrder(paramDataUser) {

        paramDataUser.fullName = $('#inp-fullname').val().trim();
        paramDataUser.email = $('#inp-email').val().trim();
        paramDataUser.dienThoai = $('#inp-phone').val().trim();
        paramDataUser.diaChi = $('#inp-address').val().trim();
        paramDataUser.message = $('#inp-message').val().trim();
        paramDataUser.maVoucher = $('#inp-voucherID').val().trim();
    }

    //Hàm điều kiện nhập thông tin User
    function validateDataUser(paramDataUser, paramMenuCombo, paramPizzaType) {

        //Combo
        if (paramMenuCombo.menuName == "...") {
            $('#combo-false-modal').modal('show');
            return false;
        }

        //Pizza type
        if (paramPizzaType == "") {
            $('#pizzaType-false-modal').modal('show');
            return false;
        }

        //Drink
        if ($('#select-drink').val() == "NOT_DRINK") {
            $('#drink-false-modal').modal('show');
            return false;
        }
        //fullname
        if (paramDataUser.fullName == "") {
            $('#fullname-false').show();
            $('#inp-fullname').addClass("is-invalid").removeClass("is-valid");
            return false;

        } else {
            $('#fullname-false').hide();
            $('#inp-fullname').addClass("is-valid").removeClass("is-invalid");
        }

        //email
        var vRegexStr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!vRegexStr.test(paramDataUser.email)) {
            $('#email-false').show();
            $('#inp-email').addClass("is-invalid").removeClass("is-valid");
            return false;

        } else {
            $('#email-false').hide();
            $('#inp-email').addClass("is-valid").removeClass("is-invalid");
        }

        //phone
        if (paramDataUser.dienThoai == "") {
            $('#phone-false').show();
            $('#inp-phone').addClass("is-invalid").removeClass("is-valid");
            return false;

        } else {
            $('#phone-false').hide();
            $('#inp-phone').addClass("is-valid").removeClass("is-invalid");
        }

        // address
        if (paramDataUser.diaChi == "") {
            $('#address-false').show();
            $('#inp-address').addClass("is-invalid").removeClass("is-valid");
            return false;

        } else {
            $('#address-false').hide();
            $('#inp-address').addClass("is-valid").removeClass("is-invalid");
        }

        return true;
    }

    // lấy dữ liệu User vào modal
    function loadUserDataToModel(paramDataOrder) {
        "use strict";

        $('#modal-fullname').val(paramDataOrder.fullName);
        $('#modal-email').val(paramDataOrder.email);
        $('#modal-phone').val(paramDataOrder.dienThoai);
        $('#modal-address').val(paramDataOrder.diaChi);
        $('#modal-message').val(paramDataOrder.message);
        $('#modal-voucherID').val(paramDataOrder.maVoucher);
    }


    //CALL API HIỂN THỊ THÔNG TIN ĐẶT HÀNG
    function callAPIloadDataOrder() {
        if (gORDER_USER.maVoucher != "") {

            $.ajax({
                url: "/voucherCode/?maVoucher=" + gORDER_USER.maVoucher,
                method: "GET",
                dataType: "json",
                success: function (reponseObject) {

                    //lấy dữ liệu voucher để tính tiền nếu có
                    if (reponseObject.data == null) {
                        $('#voucher-false-modal').modal('show');
                        showDataUserOrderToModal();
                    } else {
                        handlerVoucher(reponseObject);
                        console.log(reponseObject);
                        gDataUserOrder = reponseObject.data
                        // hiển thị kết quả thông tin khách hàng order có voucher
                        showDataUserOrderVoucherToModal();
                    }


                },
                error: function (reponseObject) {
                    console.log(reponseObject);
                    // alert("Mã voucher ko đúng!");
                    $('#voucher-false-modal').modal('show');

                    // hiển thị kết quả thông tin khách hàng order không voucher
                    showDataUserOrderToModal(reponseObject);
                }
            })
        } else {
            // hiển thị kết quả thông tin khách hàng order không voucher
            showDataUserOrderToModal(gDataUserOrder);
        }
    }


    // lấy dữ liệu thành tiền có voucher vào modal
    function handlerVoucher(paramDiscount) {

        var vPrices = gSelectedMenuStructure.priceVND;
        var vResultPrices = vPrices - (vPrices * (paramDiscount.data.phanTramGiamGia * 0.01));
        //
        gPricesDiscount.discount = parseInt(paramDiscount.data.phanTramGiamGia);
        gPricesDiscount.price = vResultPrices;
    }

    //Hiển thị thông tin order có vourcher
    function showDataUserOrderVoucherToModal() {

        $('#modal-chi-tiet').html("XÁC NHẬN : " + "  " + gORDER_USER.fullName + ";   " + "sđt: " + gORDER_USER.dienThoai + ";   " + "địa chỉ: " + gORDER_USER.diaChi + "." + "&#10;" +
            "MENU : " + "  " + "size:" + gSelectedMenuStructure.menuName + "  (" + gSelectedMenuStructure.duongKinhCM + ");   " + "sườn nướng: " + gSelectedMenuStructure.suonNuong + " pieces;   " + "salad: " + gSelectedMenuStructure.saladGr + "Gr;   " + "nước: " + gSelectedMenuStructure.drink + " cup." + "&#10;" +
            "LOẠI PIZZA: " + "  " + gSelectedPizzaType + ";   " + "giá: " + gSelectedMenuStructure.priceVND + "vnđ;" + "  " + "Mã giảm giá:" + gORDER_USER.maVoucher + "." + "&#10;" +
            "NƯỚC: " + " " + $('#select-drink').val() + "&#10;" +
            "PHẢI THANH TOÁN: " + "  " + gPricesDiscount.price + "vnđ" + "  " + "(giảm giá:" + gPricesDiscount.discount + "%" + ")."
        )

    }

    //Hiển thị thông tin order không vourcher
    function showDataUserOrderToModal() {

        $('#modal-chi-tiet').html("XÁC NHẬN : " + "  " + gORDER_USER.fullName + ";   " + "sđt: " + gORDER_USER.dienThoai + ";   " + "địa chỉ: " + gORDER_USER.diaChi + "." + "&#10;" +
            "MENU : " + "  " + "size:" + gSelectedMenuStructure.menuName + "  (" + gSelectedMenuStructure.duongKinhCM + ");   " + "sườn nướng: " + gSelectedMenuStructure.suonNuong + " pieces;   " + "salad: " + gSelectedMenuStructure.saladGr + "Gr;   " + "nước: " + gSelectedMenuStructure.drink + " cup." + "&#10;" +
            "LOẠI PIZZA : " + "  " + gSelectedPizzaType + ";   " + "giá: " + gSelectedMenuStructure.priceVND + "vnđ." + "&#10;" +
            "NƯỚC: " + " " + $('#select-drink').val() + "&#10;" +
            "PHẢI THANH TOÁN : " + "  " + gSelectedMenuStructure.priceVND + "vnđ."
        )
    }


    //HÀM NÚT TẠO ĐƠN

    // Lấy dữ liệu order
    function getInforOrderData() {

        gObjectRequest.kichCo = gSelectedMenuStructure.menuName;
        gObjectRequest.duongKinh = gSelectedMenuStructure.duongKinhCM;
        gObjectRequest.suon = gSelectedMenuStructure.suonNuong;
        gObjectRequest.salad = gSelectedMenuStructure.saladGr;
        gObjectRequest.soLuongNuoc = gSelectedMenuStructure.drink;

        gObjectRequest.loaiPizza = gSelectedPizzaType;

        gObjectRequest.maVoucher = gORDER_USER.maVoucher;
        gObjectRequest.maNuocUong = $('#select-drink').val();
        gObjectRequest.fullName = gORDER_USER.fullName;
        gObjectRequest.email = gORDER_USER.email;
        gObjectRequest.phone = gORDER_USER.dienThoai;
        gObjectRequest.address = gORDER_USER.diaChi;
        gObjectRequest.loiNhan = gORDER_USER.message;

        gObjectRequest.thanhTien = gSelectedMenuStructure.priceVND;gPricesDiscount
        gObjectRequest.giamGia = gPricesDiscount.discount;

    }


    // CALL API Post dữ liệu
    function callApiPostData() {
        $.ajax({
            url: "/devcamp-pizza365/orders?email=" + gORDER_USER.email,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(gObjectRequest),
            success: function (response) {
                console.log(response);
                showOrderID(response);
            },
            error: function (error) {
                console.log(error);
                alert("Tạo đơn hàng không thành công")
            }
        })
    }

    //Hiển thị maVoucher
    function showOrderID(paramOrderID) {
        $('#order-modal').modal('hide');
        $('#modal-orderID').modal('show');
        $('#modal-result-orderID').html(paramOrderID.data.orderCode)
    }

    //voucher sai
    $('#modal-run').on('click', function () {
        $('#order-modal').modal('show')
    })



    $('#select-drink').on("change", function () {

        if ($('#select-drink').val() == "NOT_DRINK") {
            $('#img-coca').attr('style', '  filter: grayscale(100);');
            $('#img-pepsi').attr('style', '  filter: grayscale(100);');
            $('#img-fanta').attr('style', '  filter: grayscale(100);');
            $('#img-trasua').attr('style', '  filter: grayscale(100);');
            $('#img-tratac').attr('style', '  filter: grayscale(100);');
            $('#img-lavie').attr('style', '  filter: grayscale(100);');
        }

        if ($('#select-drink').val() == "COCA") {
            $('#img-coca').attr('style', '  filter: grayscale(0);');
            $('#img-pepsi').attr('style', '  filter: grayscale(100);');
            $('#img-fanta').attr('style', '  filter: grayscale(100);');
            $('#img-trasua').attr('style', '  filter: grayscale(100);');
            $('#img-tratac').attr('style', '  filter: grayscale(100);');
            $('#img-lavie').attr('style', '  filter: grayscale(100);');
        }

        if ($('#select-drink').val() == "PEPSI") {
            $('#img-coca').attr('style', '  filter: grayscale(100);');
            $('#img-pepsi').attr('style', '  filter: grayscale(0);');
            $('#img-fanta').attr('style', '  filter: grayscale(100);');
            $('#img-trasua').attr('style', '  filter: grayscale(100);');
            $('#img-tratac').attr('style', '  filter: grayscale(100);');
            $('#img-lavie').attr('style', '  filter: grayscale(100);');
        }

        if ($('#select-drink').val() == "FANTA") {
            $('#img-coca').attr('style', '  filter: grayscale(100);');
            $('#img-pepsi').attr('style', '  filter: grayscale(100);');
            $('#img-fanta').attr('style', '  filter: grayscale(0);');
            $('#img-trasua').attr('style', '  filter: grayscale(100);');
            $('#img-tratac').attr('style', '  filter: grayscale(100);');
            $('#img-lavie').attr('style', '  filter: grayscale(100);');
        }

        if ($('#select-drink').val() == "TRASUA") {
            $('#img-coca').attr('style', '  filter: grayscale(100);');
            $('#img-pepsi').attr('style', '  filter: grayscale(100);');
            $('#img-fanta').attr('style', '  filter: grayscale(100);');
            $('#img-trasua').attr('style', '  filter: grayscale(0);');
            $('#img-tratac').attr('style', '  filter: grayscale(100);');
            $('#img-lavie').attr('style', '  filter: grayscale(100);');

        }

        if ($('#select-drink').val() == "TRATAC") {
            $('#img-coca').attr('style', '  filter: grayscale(100);');
            $('#img-pepsi').attr('style', '  filter: grayscale(100);');
            $('#img-fanta').attr('style', '  filter: grayscale(100);');
            $('#img-trasua').attr('style', '  filter: grayscale(100);');
            $('#img-tratac').attr('style', '  filter: grayscale(0);');
            $('#img-lavie').attr('style', '  filter: grayscale(100);');

        }

        if ($('#select-drink').val() == "LAVIE") {
            $('#img-coca').attr('style', '  filter: grayscale(100);');
            $('#img-pepsi').attr('style', '  filter: grayscale(100);');
            $('#img-fanta').attr('style', '  filter: grayscale(100);');
            $('#img-trasua').attr('style', '  filter: grayscale(100);');
            $('#img-tratac').attr('style', '  filter: grayscale(100);');
            $('#img-lavie').attr('style', '  filter: grayscale(0);');

        }

    })