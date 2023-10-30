var nhacc = {
    init: function () {
        get_ds_ncc();
        $('#btn-add-nhacc').click(function () {
            $('#titleNhacc').text('Thêm nhà cung cấp');
            $('#ipIdHidden').val(0);
            $('#ipMaNCC').val('');
            $('#ipTenNCC').val('');
            $('#modalThemSuaNhacc').modal('show');
        });
        $('#btnSave').click(function () {
            them_sua_nhacc();
        });
    }
}
function get_ds_ncc() {
    let target_selector = '#ds-cung-cap';
    $(target_selector).html('Đang tải danh sách nhà cung cấp...');
    $.post("api.aspx",
        {
            action: "get_ds_ncc"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_nhacc = L.nCCs;
                if (L.nCCs) {
                    let s = "<table class='vien_den'>";
                    s += "<tr><th>Mã nhà cung cấp</th><th>Tên nhà cung cấp</th><th>Chức năng</th></tr>";
                    for (let item of data_nhacc) {
                        s += "<tr>";
                        s += "<td>" + item.MaNCC + "</td>";
                        s += "<td>" + item.TenNCC + "</td>";
                        s += '<td align=center><button type="button" onclick="get_nhacc_id(' + item.Id + ')" class="btn btn-sm btn-warning btnSua me-2">Sửa</button>' +
                            '<button type = "button" onclick="xoa_nhacc(' + item.Id + ')" class="btn btn-sm btn-danger"> Xóa</button ></td > ';
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
function them_sua_nhacc() {
    var send_data = {
        action: 'them_sua_nhacc',
        id: $('#ipIdHidden').val(),
        mancc: $('#ipMaNCC').val(),
        tenncc: $('#ipTenNCC').val(),
    }
    $.post("api.aspx",
        send_data,
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                $('#modalThemSuaNhacc').modal('hide');
                toastr.success('Cập nhật thông tin thành công');
                get_ds_ncc();
            } else {
                toastr.warning(json.msg);
            }
        });
}
function get_nhacc_id(id) {
    $.post("api.aspx",
        {
            action: "get_nhacc_byId",
            id: id
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                $('#ipIdHidden').val(L.nhaCCs.Id);
                $('#ipMaNCC').val(L.nhaCCs.MaNCC);
                $('#ipTenNCC').val(L.nhaCCs.TenNCC);
                $('#titleNhacc').text('Chỉnh sửa nhà cung cấp');
                $('#modalThemSuaNhacc').modal('show');
            }
        });
}
function xoa_nhacc(id) {
    $.confirm({
        title: 'Xác nhận!',
        content: 'Bạn có muốn xóa thông tin nhà cung cấp này!',
        buttons: {
            confirm: function () {
                var send_data = {
                    action: 'xoa_nhacc',
                    id: id,
                }
                $.post("api.aspx",
                    send_data,
                    function (data) {
                        var json = JSON.parse(data);
                        if (json.ok) {
                            toastr.success('Xóa thành công');
                            get_ds_ncc();
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
    nhacc.init();
});