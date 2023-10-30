var sanPham = {
    loadData: function () {
        get_ds_san_pham();
        $('#btn-add-san-pham').click(function () {
            get_ds_ncc(0);
            $('#ipMaSp').val('');
            $('#ipIdHidden').val(0);
            $('#ipTenSp').val('');
            $('#sltNcc').val(0);
            $('#ipSize').val('');
            $('#ipMauSac').val('');
            $('#ipSoLuong').val(0);
            $('#ipGiaTien').val(0);
            $('#exampleModalLabel').text('Thêm mới sản phẩm');
            $('#modalThemSanPham').modal('show');
        });
        $('#btnSave').click(function () {
            them_sp();
        });
    }
}
function get_ds_san_pham() {
    let target_selector = '#ds-san-pham';
    $(target_selector).html('Đang tải danh sách sản phẩm...');
    $.post("api.aspx",
        {
            action: "get_ds_san_pham"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_sanpham = L.sanPhams;
                if (L.sanPhams) {
                    let s = "<table class='vien_den'>";
                    s += "<tr><th>Mã SP</th><th>Tên SP</th><th>Hãng SX</th> <th>Size</th><th>Màu sắc</th><th>Số lượng</th><th>Giá tiền</th><th>Chức năng</th></tr>";
                    for (let item of data_sanpham) {
                        s += "<tr>";
                        s += "<td>" + item.MaSP + "</td>";
                        s += "<td>" + item.TenSp + "</td>";
                        s += "<td>" + item.TenNCC + "</td>";
                        s += "<td>" + item.Size + "</td>";
                        s += "<td>" + item.MauSac + "</td>";
                        s += "<td>" + item.SoLuong + "</td>";
                        s += "<td align=right>" + item.GiaTien + "</td>";
                        s += '<td align=center><button type="button" onclick="get_sp_id(' + item.Id + ')" class="btn btn-sm btn-warning btnSua me-2">Sửa</button>' +
                            '<button type = "button" onclick="xoa_sp(' + item.Id + ')" class="btn btn-sm btn-danger"> Xóa</button ></td > ';
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
function get_ds_ncc(id) {
    $.post("api.aspx",
        {
            action: "get_ds_ncc"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_ds_ncc = L.nCCs;
                var html = '<option value="0">--Chọn NCC--</option>';
                if (data_ds_ncc.length > 0) {
                    for (let item of data_ds_ncc) {
                        if (item.Id == id) {
                            html += '<option value="' + item.Id + '" selected>' + item.TenNCC + '</option>';
                        } else {
                            html += '<option value="' + item.Id + '">' + item.TenNCC + '</option>';
                        }
                    }
                }
                $('#sltNcc').empty();
                $('#sltNcc').html(html);
            }
        });
}
function them_sp() {
    var send_data = {
        action: 'them_sanpham',
        id: $('#ipIdHidden').val(),
        masp: $('#ipMaSp').val(),
        tensp: $('#ipTenSp').val(),
        ncc: $('#sltNcc').val(),
        size: $('#ipSize').val(),
        mausac: $('#ipMauSac').val(),
        soluong: $('#ipSoLuong').val(),
        giatien: $('#ipGiaTien').val(),
    }
    $.post("api.aspx",
        send_data,
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                $('#modalThemSanPham').modal('hide');
                toastr.success('Cập nhật thông tin thành công');
                get_ds_san_pham();
            } else {
                toastr.warning(json.msg);
            }
        });
}

function xoa_sp(id) {
    $.confirm({
        title: 'Xác nhận!',
        content: 'Bạn có muốn xóa thông tin sản phẩm này!',
        buttons: {
            confirm: function () {
                var send_data = {
                    action: 'xoa_sanpham',
                    id: id,
                }
                $.post("api.aspx",
                    send_data,
                    function (data) {
                        var json = JSON.parse(data);
                        if (json.ok) {
                            toastr.success('Xóa thành công');
                            get_ds_san_pham();
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
function get_sp_id(id) {
    $.post("api.aspx",
        {
            action: "get_sanpham_byId",
            id: id
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                get_ds_ncc(L.sanPhams.NccId);
                $('#ipMaSp').val(L.sanPhams.MaSP);
                $('#ipIdHidden').val(L.sanPhams.Id);
                $('#ipTenSp').val(L.sanPhams.TenSp);
                $('#sltNcc').val(L.sanPhams.NccId);
                $('#ipSize').val(L.sanPhams.Size);
                $('#ipMauSac').val(L.sanPhams.MauSac);
                $('#ipSoLuong').val(L.sanPhams.SoLuong);
                $('#ipGiaTien').val(L.sanPhams.GiaTien);
                $('#exampleModalLabel').text('Chỉnh sửa sản phẩm');
                $('#modalThemSanPham').modal('show');
            }
        });
}
$(document).ready(function () {
    sanPham.loadData();
});