var khohang = {
    init: function () {
        get_ds_khohang();
        $('#btn-add-nhaphang').click(function () {
            $('#sltSanPham').val(0);
            $('#ipSoLuong').val(0);
            get_ds_san_pham();
            $('#modalNhapKho').modal('show');
        });
        $('#btnNhapKho').click(function () {
            if ($('#sltSanPham').val() == 0) {
                toastr.warning("Vui lòng chọn sản phẩm");
                return;
            }
            if ($('#ipSoLuong') == null || $('#ipSoLuong') == undefined || $('#ipSoLuong').val() < 0) {
                toastr.warning("Vui lòng nhập số lượng và lớn hơn 0");
                return;
            }
            nhap_khohang();
        });
        $('#btnHuySP').click(function () {
            if ($('#ipSoLuongHuy').val() == undefined || $('#ipSoLuongHuy').val() == null || $('#ipSoLuongHuy').val() == '' || $('#ipSoLuongHuy').val() <= 0){
                toastr.warning("Vui lòng nhập số lượng hủy và lớn hơn 0");
                return;
            }
            huy_sp_khohang();
        });
    }
}
function get_ds_khohang() {
    let target_selector = '#ds-kho-hang';
    $(target_selector).html('Đang tải kho hàng...');
    $.post("api.aspx",
        {
            action: "get_ds_khohang"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_kho = L._khohangs;
                if (L._khohangs) {
                    let s = "<table class='vien_den'>";
                    s += "<tr><th>Mã sản phẩm</th><th>Tên sản phẩm</th><th>Size</th><th>Màu sắc</th><th>Số lượng tồn</th><th>Số lượng bán</th><th>Số lượng hỏng</th><th>Chức năng</th></tr>";
                    for (let item of data_kho) {
                        s += "<tr>";
                        s += "<td>" + item.MaSp + "</td>";
                        s += "<td>" + item.TenSp + "</td>";
                        s += "<td>" + item.Size + "</td>";
                        s += "<td>" + item.MauSac + "</td>";
                        s += "<td>" + item.SoLuongSp + "</td>";
                        s += "<td>" + item.SoLuongBan + "</td>";
                        s += "<td>" + item.SoLuongHong + "</td>";
                        s += '<td align=center><button type="button" onclick="model_HuySP(' + item.SanPhamId + ')" class="btn btn-sm btn-warning btnSua me-2">Hủy SP</button>' +
                            '<button type = "button" onclick="xoa_khohang(' + item.Id + ')" class="btn btn-sm btn-danger"> Xóa</button ></td > ';
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
function get_ds_san_pham() {
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
                        html += '<option value="' + item.Id + '">' + item.MaSP + "_" + item.TenSp + '</option>';
                    }
                }
                $('#sltSanPham').empty();
                $('#sltSanPham').html(html);
            }
        });
}
function get_selectSp(id) {
    $.post("api.aspx",
        {
            action: "get_ds_san_pham"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_sanpham = L.sanPhams;
                var html = '';
                if (data_sanpham.length > 0) {
                    for (let item of data_sanpham) {
                        if (id == item.Id) {
                            html += '<option value="' + item.Id + '" selected>' + item.MaSP + "_" + item.TenSp + '</option>';
                        }
                    }
                }
                $('#sltSanPhamHuy').empty();
                $('#sltSanPhamHuy').html(html);
            }
        });
}
function nhap_khohang() {
    var send_data = {
        action: 'nhap_khohang',
        sanphamid: $('#sltSanPham').val(),
        soluong: $('#ipSoLuong').val()
    }
    $.post("api.aspx",
        send_data,
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                $('#modalNhapKho').modal('hide');
                toastr.success('Cập nhật thông tin thành công');
                get_ds_khohang();
            } else {
                toastr.warning(json.msg);
            }
        });
}
function huy_sp_khohang() {
    var send_data = {
        action: 'Huy_SanPham_khohang',
        sanphamid: $('#ipHiddenSanPhamId').val(),
        soluong: $('#ipSoLuongHuy').val()
    }
    $.post("api.aspx",
        send_data,
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                $('#modalHuySanPham').modal('hide');
                toastr.success('Cập nhật thông tin thành công');
                get_ds_khohang();
            } else {
                toastr.warning(json.msg);
            }
        });
}
function model_HuySP(sanPhamId) {
    get_selectSp(sanPhamId);
    $('#ipHiddenSanPhamId').val(sanPhamId);
    $('#modalHuySanPham').modal('show');
}
function xoa_khohang(id) {
    $.confirm({
        title: 'Xác nhận!',
        content: 'Bạn có muốn xóa thông tin nhập kho này!',
        buttons: {
            confirm: function () {
                var send_data = {
                    action: 'xoa_khohang',
                    id: id,
                }
                $.post("api.aspx",
                    send_data,
                    function (data) {
                        var json = JSON.parse(data);
                        if (json.ok) {
                            toastr.success('Xóa thành công');
                            get_ds_khohang();
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
$(document).ready(function () {
    khohang.init();
});