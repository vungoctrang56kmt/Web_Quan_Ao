var donHang = {
    init: function () {
        get_ds_donhang();
        $('#btn-add-don-hang').click(function () {
            $('#ipTenDH').val('');
            $('#titleDonHang').text('Thêm đơn hàng');
            $('#modalThemDonHang').modal('show');
        });
        $('#btnSaveDH').click(function () {
            them_donhang();
        });
        $('#btnThemCTDH').click(function () {
            them_ctdonhang();
        });
    }
}
function get_ds_donhang() {
    let target_selector = '#ds-don-hang';
    $(target_selector).html('Đang tải danh sách đơn hàng...');
    $.post("api.aspx",
        {
            action: "get_ds_donhang"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_dh = L.donHangs;
                if (L.donHangs) {
                    let s = "<table class='vien_den'>";
                    s += "<tr><th>Mã đơn hàng</th><th>Tên đơn hàng</th><th>Ngày lập đơn</th><th>Chức năng</th>";
                    for (let item of data_dh) {
                        s += "<tr>";
                        s += "<td><a href='javascript:void(0)' onclick='ct_donhang(" + item.Id + ")'>" + item.MaDH + "<a/></td>";
                        s += "<td>" + item.TenDH + "</td>";
                        s += "<td>" + (item.NgayLap != null ? moment(item.NgayLap).format('DD-MM-YYYY') : "") + "</td>";
                        s += '<td align=center><button type="button" onclick="get_donhang_id(' + item.Id + ')" class="btn btn-sm btn-warning btnSua me-2">Sửa</button>' +
                            '<button type = "button" onclick="xoa_donhang(' + item.Id + ')" class="btn btn-sm btn-danger"> Xóa</button ></td > ';
                        s += "</tr>";
                    }
                    s += "</table>";
                    $(target_selector).html(s);
                } else {
                    $(target_selector).html('Không có dữ liệu');
                }
            }
        });
}
function them_donhang() {
    var send_data = {
        action: 'them_donhang',
        tendh: $('#ipTenDH').val(),
        id: $('#ipIdHidden').val()
    }
    $.post("api.aspx",
        send_data,
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                $('#modalThemDonHang').modal('hide');
                toastr.success('Cập nhật thông tin thành công');
                get_ds_donhang();
            } else {
                toastr.warning(json.msg);
            }
        });
}
function get_donhang_id(id) {
    $.post("api.aspx",
        {
            action: "get_Donhang_byId",
            id: id
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                $('#ipIdHidden').val(L.donHangs.Id);
                $('#ipTenDH').val(L.donHangs.TenDH);
                $('#titleDonHang').text('Chỉnh sửa đơn hàng');
                $('#modalThemDonHang').modal('show');
            }
        });
}
function xoa_donhang(id) {
    $.confirm({
        title: 'Xác nhận!',
        content: 'Bạn có muốn xóa thông tin đơn hàng này!',
        buttons: {
            confirm: function () {
                var send_data = {
                    action: 'xoa_donhang',
                    id: id,
                }
                $.post("api.aspx",
                    send_data,
                    function (data) {
                        var json = JSON.parse(data);
                        if (json.ok) {
                            toastr.success('Xóa thành công');
                            get_ds_donhang();
                        } else {
                            toastr.warning(json.msg);
                        }
                    });
            },
            cancel: function () {

            },
        }
    });
}
function get_ds_ct_donhang(id) {
    let target_selector = '#ds-ct-don-hang';
    $(target_selector).html('Đang tải danh sách chi tiết đơn hàng...');
    $.post("api.aspx",
        {
            action: "get_ds_ctdonhang",
            id: id
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_ctdh = L.cTDonHangs;
                if (L.cTDonHangs) {
                    var tendonHang = L.cTDonHangs[0].TenDH;
                    $('#titleCTDH').text(tendonHang);
                    let s = "<table class='vien_den w-100'>";
                    s += "<tr><th>Mã SP</th><th>Tên SP</th><th>Số lượng</th><th>Giá bán</th><th>Tổng tiền</th></tr>";
                    for (let item of data_ctdh) {
                        s += "<tr>";
                        s += "<td>" + item.MaSp + "</td>";
                        s += "<td>" + item.TenSp + "</td>";
                        s += "<td>" + item.SoLuong + "</td>";
                        s += "<td>" + item.Giaban + "</td>";
                        s += "<td>" + item.TongTien + "</td>";
                        s += "</tr>";
                    }
                    s += "<tfoot><tr><td colspan=4 style='text-align:left'>Tổng tiền: </td><td align=left>" + L.TongTienDH+"</td></tr></tfoot>";
                    s += "</table>";
                    $(target_selector).html(s);
                } else {
                    $(target_selector).html('Không có dữ liệu');
                }
            }
        });
}
function ct_donhang(id) {
    get_ds_san_pham(0);
    $('#ipHiddenIdCTDH').val(id);
    $('#modalCTDonHang').modal('show');
    get_ds_ct_donhang(id);
}
function get_ds_san_pham(id) {
    $.post("api.aspx",
        {
            action: "get_ds_san_pham"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_sanpham = L.sanPhams;
                var html = '<option value="0">--Chọn sản phẩm--</option>';
                if (data_sanpham.length > 0) {
                    for (let item of data_sanpham) {
                        if (item.Id == id) {
                            html += '<option value="' + item.Id + '" selected>' + item.MaSP + "_" + item.TenSp + '</option>';
                        } else {
                            html += '<option value="' + item.Id + '">' + item.MaSP + "_" + item.TenSp + '</option>';
                        }
                    }
                }
                $('#sltSanPham').empty();
                $('#sltSanPham').html(html);
            }
        });
}
function them_ctdonhang() {
    if ($('#sltSanPham').val() == 0) {
        toastr.warning("Vui lòng chọn sản phẩm");
        return;
    }
    if ($('#ipSoluongBan').val() < 0) {
        toastr.warning("Vui lòng nhập số lượng bán lớn hơn 0");
        return;
    }
    if ($('#ipGiaBan').val() < 0) {
        toastr.warning("Vui lòng nhập số tiền bán lớn hơn 0");
        return;
    }
    var donhangId = $('#ipHiddenIdCTDH').val();
    var send_data = {
        action: 'them_cthoadon',
        sanphamid: $('#sltSanPham').val(),
        soluongban: $('#ipSoluongBan').val(),
        giaban: $('#ipGiaBan').val(),
        donhangid: donhangId
    }
    $.post("api.aspx",
        send_data,
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                $('#sltSanPham').val(0);
                $('#ipSoluongBan').val(0);
                $('#ipGiaBan').val(0);
                toastr.success('Cập nhật thông tin thành công');
                get_ds_ct_donhang(donhangId);
            } else {
                toastr.warning(json.msg);
            }
        });
}
$(document).ready(function () {
    donHang.init();
});