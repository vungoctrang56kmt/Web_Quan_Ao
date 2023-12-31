﻿/*!
   Copyright 2015-2021 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net/extensions/select
 Select for DataTables 1.3.3
 2015-2021 SpryMedia Ltd - datatables.net/license/mit
*/
(function (h) { "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function (q) { return h(q, window, document) }) : "object" === typeof exports ? module.exports = function (q, t) { q || (q = window); t && t.fn.dataTable || (t = require("datatables.net")(q, t).$); return h(t, q, q.document) } : h(jQuery, window, document) })(function (h, q, t, n) {
    function E(a, b, c) {
        var d = function (g, f) { if (g > f) { var k = f; f = g; g = k } var l = !1; return a.columns(":visible").indexes().filter(function (p) { p === g && (l = !0); return p === f ? (l = !1, !0) : l }) }; var e =
            function (g, f) { var k = a.rows({ search: "applied" }).indexes(); if (k.indexOf(g) > k.indexOf(f)) { var l = f; f = g; g = l } var p = !1; return k.filter(function (u) { u === g && (p = !0); return u === f ? (p = !1, !0) : p }) }; a.cells({ selected: !0 }).any() || c ? (d = d(c.column, b.column), c = e(c.row, b.row)) : (d = d(0, b.column), c = e(0, b.row)); c = a.cells(c, d).flatten(); a.cells(b, { selected: !0 }).any() ? a.cells(c).deselect() : a.cells(c).select()
    } function A(a) {
        var b = a.settings()[0]._select.selector; h(a.table().container()).off("mousedown.dtSelect", b).off("mouseup.dtSelect",
            b).off("click.dtSelect", b); h("body").off("click.dtSelect" + a.table().node().id.replace(/[^a-zA-Z0-9\-_]/g, "-"))
    } function F(a) {
        var b = h(a.table().container()), c = a.settings()[0], d = c._select.selector, e; b.on("mousedown.dtSelect", d, function (g) { if (g.shiftKey || g.metaKey || g.ctrlKey) b.css("-moz-user-select", "none").one("selectstart.dtSelect", d, function () { return !1 }); q.getSelection && (e = q.getSelection()) }).on("mouseup.dtSelect", d, function () { b.css("-moz-user-select", "") }).on("click.dtSelect", d, function (g) {
            var f =
                a.select.items(); if (e) { var k = q.getSelection(); if ((!k.anchorNode || h(k.anchorNode).closest("table")[0] === a.table().node()) && k !== e) return } k = a.settings()[0]; var l = a.settings()[0].oClasses.sWrapper.trim().replace(/ +/g, "."); if (h(g.target).closest("div." + l)[0] == a.table().container() && (l = a.cell(h(g.target).closest("td, th")), l.any())) {
                    var p = h.Event("user-select.dt"); r(a, p, [f, l, g]); p.isDefaultPrevented() || (p = l.index(), "row" === f ? (f = p.row, B(g, a, k, "row", f)) : "column" === f ? (f = l.index().column, B(g, a, k, "column",
                        f)) : "cell" === f && (f = l.index(), B(g, a, k, "cell", f)), k._select_lastCell = p)
                }
        }); h("body").on("click.dtSelect" + a.table().node().id.replace(/[^a-zA-Z0-9\-_]/g, "-"), function (g) { !c._select.blurable || h(g.target).parents().filter(a.table().container()).length || 0 === h(g.target).parents("html").length || h(g.target).parents("div.DTE").length || x(c, !0) })
    } function r(a, b, c, d) { if (!d || a.flatten().length) "string" === typeof b && (b += ".dt"), c.unshift(a), h(a.table().node()).trigger(b, c) } function I(a) {
        var b = a.settings()[0]; if (b._select.info &&
            b.aanFeatures.i && "api" !== a.select.style()) {
                var c = a.rows({ selected: !0 }).flatten().length, d = a.columns({ selected: !0 }).flatten().length, e = a.cells({ selected: !0 }).flatten().length, g = function (f, k, l) { f.append(h('<span class="select-item"/>').append(a.i18n("select." + k + "s", { _: "%d " + k + "s selected", 0: "", 1: "1 " + k + " selected" }, l))) }; h.each(b.aanFeatures.i, function (f, k) {
                    k = h(k); f = h('<span class="select-info"/>'); g(f, "row", c); g(f, "column", d); g(f, "cell", e); var l = k.children("span.select-info"); l.length && l.remove();
                    "" !== f.text() && k.append(f)
                })
        }
    } function J(a) {
        var b = new m.Api(a); a.aoRowCreatedCallback.push({ fn: function (c, d, e) { d = a.aoData[e]; d._select_selected && h(c).addClass(a._select.className); c = 0; for (e = a.aoColumns.length; c < e; c++)(a.aoColumns[c]._select_selected || d._selected_cells && d._selected_cells[c]) && h(d.anCells[c]).addClass(a._select.className) }, sName: "select-deferRender" }); b.on("preXhr.dt.dtSelect", function (c, d) {
            if (d === b.settings()[0]) {
                var e = b.rows({ selected: !0 }).ids(!0).filter(function (f) { return f !== n }),
                g = b.cells({ selected: !0 }).eq(0).map(function (f) { var k = b.row(f.row).id(!0); return k ? { row: k, column: f.column } : n }).filter(function (f) { return f !== n }); b.one("draw.dt.dtSelect", function () { b.rows(e).select(); g.any() && g.each(function (f) { b.cells(f.row, f.column).select() }) })
            }
        }); b.on("draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt", function () { I(b) }); b.on("destroy.dtSelect", function () { b.rows({ selected: !0 }).deselect(); A(b); b.off(".dtSelect") })
    } function G(a, b, c, d) {
        var e = a[b + "s"]({ search: "applied" }).indexes();
        d = h.inArray(d, e); var g = h.inArray(c, e); if (a[b + "s"]({ selected: !0 }).any() || -1 !== d) { if (d > g) { var f = g; g = d; d = f } e.splice(g + 1, e.length); e.splice(0, d) } else e.splice(h.inArray(c, e) + 1, e.length); a[b](c, { selected: !0 }).any() ? (e.splice(h.inArray(c, e), 1), a[b + "s"](e).deselect()) : a[b + "s"](e).select()
    } function x(a, b) { if (b || "single" === a._select.style) a = new m.Api(a), a.rows({ selected: !0 }).deselect(), a.columns({ selected: !0 }).deselect(), a.cells({ selected: !0 }).deselect() } function B(a, b, c, d, e) {
        var g = b.select.style(), f = b.select.toggleable(),
        k = b[d](e, { selected: !0 }).any(); if (!k || f) "os" === g ? a.ctrlKey || a.metaKey ? b[d](e).select(!k) : a.shiftKey ? "cell" === d ? E(b, e, c._select_lastCell || null) : G(b, d, e, c._select_lastCell ? c._select_lastCell[d] : null) : (a = b[d + "s"]({ selected: !0 }), k && 1 === a.flatten().length ? b[d](e).deselect() : (a.deselect(), b[d](e).select())) : "multi+shift" == g ? a.shiftKey ? "cell" === d ? E(b, e, c._select_lastCell || null) : G(b, d, e, c._select_lastCell ? c._select_lastCell[d] : null) : b[d](e).select(!k) : b[d](e).select(!k)
    } function y(a, b) {
        return function (c) {
            return c.i18n("buttons." +
                a, b)
        }
    } function C(a) { a = a._eventNamespace; return "draw.dt.DT" + a + " select.dt.DT" + a + " deselect.dt.DT" + a } function K(a, b) { return -1 !== h.inArray("rows", b.limitTo) && a.rows({ selected: !0 }).any() || -1 !== h.inArray("columns", b.limitTo) && a.columns({ selected: !0 }).any() || -1 !== h.inArray("cells", b.limitTo) && a.cells({ selected: !0 }).any() ? !0 : !1 } var m = h.fn.dataTable; m.select = {}; m.select.version = "1.3.3"; m.select.init = function (a) {
        var b = a.settings()[0], c = b.oInit.select, d = m.defaults.select; c = c === n ? d : c; d = "row"; var e = "api", g = !1,
            f = !0, k = !0, l = "td, th", p = "selected", u = !1; b._select = {}; !0 === c ? (e = "os", u = !0) : "string" === typeof c ? (e = c, u = !0) : h.isPlainObject(c) && (c.blurable !== n && (g = c.blurable), c.toggleable !== n && (f = c.toggleable), c.info !== n && (k = c.info), c.items !== n && (d = c.items), e = c.style !== n ? c.style : "os", u = !0, c.selector !== n && (l = c.selector), c.className !== n && (p = c.className)); a.select.selector(l); a.select.items(d); a.select.style(e); a.select.blurable(g); a.select.toggleable(f); a.select.info(k); b._select.className = p; h.fn.dataTable.ext.order["select-checkbox"] =
                function (z, L) { return this.api().column(L, { order: "index" }).nodes().map(function (H) { return "row" === z._select.items ? h(H).parent().hasClass(z._select.className) : "cell" === z._select.items ? h(H).hasClass(z._select.className) : !1 }) }; !u && h(a.table().node()).hasClass("selectable") && a.select.style("os")
    }; h.each([{ type: "row", prop: "aoData" }, { type: "column", prop: "aoColumns" }], function (a, b) {
        m.ext.selector[b.type].push(function (c, d, e) {
            d = d.selected; var g = []; if (!0 !== d && !1 !== d) return e; for (var f = 0, k = e.length; f < k; f++) {
                var l =
                    c[b.prop][e[f]]; (!0 === d && !0 === l._select_selected || !1 === d && !l._select_selected) && g.push(e[f])
            } return g
        })
    }); m.ext.selector.cell.push(function (a, b, c) { b = b.selected; var d = []; if (b === n) return c; for (var e = 0, g = c.length; e < g; e++) { var f = a.aoData[c[e].row]; (!0 === b && f._selected_cells && !0 === f._selected_cells[c[e].column] || !(!1 !== b || f._selected_cells && f._selected_cells[c[e].column])) && d.push(c[e]) } return d }); var v = m.Api.register, w = m.Api.registerPlural; v("select()", function () { return this.iterator("table", function (a) { m.select.init(new m.Api(a)) }) });
    v("select.blurable()", function (a) { return a === n ? this.context[0]._select.blurable : this.iterator("table", function (b) { b._select.blurable = a }) }); v("select.toggleable()", function (a) { return a === n ? this.context[0]._select.toggleable : this.iterator("table", function (b) { b._select.toggleable = a }) }); v("select.info()", function (a) { return a === n ? this.context[0]._select.info : this.iterator("table", function (b) { b._select.info = a }) }); v("select.items()", function (a) {
        return a === n ? this.context[0]._select.items : this.iterator("table",
            function (b) { b._select.items = a; r(new m.Api(b), "selectItems", [a]) })
    }); v("select.style()", function (a) { return a === n ? this.context[0]._select.style : this.iterator("table", function (b) { b._select.style = a; b._select_init || J(b); var c = new m.Api(b); A(c); "api" !== a && F(c); r(new m.Api(b), "selectStyle", [a]) }) }); v("select.selector()", function (a) { return a === n ? this.context[0]._select.selector : this.iterator("table", function (b) { A(new m.Api(b)); b._select.selector = a; "api" !== b._select.style && F(new m.Api(b)) }) }); w("rows().select()",
        "row().select()", function (a) { var b = this; if (!1 === a) return this.deselect(); this.iterator("row", function (c, d) { x(c); c.aoData[d]._select_selected = !0; h(c.aoData[d].nTr).addClass(c._select.className) }); this.iterator("table", function (c, d) { r(b, "select", ["row", b[d]], !0) }); return this }); w("columns().select()", "column().select()", function (a) {
            var b = this; if (!1 === a) return this.deselect(); this.iterator("column", function (c, d) {
                x(c); c.aoColumns[d]._select_selected = !0; d = (new m.Api(c)).column(d); h(d.header()).addClass(c._select.className);
                h(d.footer()).addClass(c._select.className); d.nodes().to$().addClass(c._select.className)
            }); this.iterator("table", function (c, d) { r(b, "select", ["column", b[d]], !0) }); return this
        }); w("cells().select()", "cell().select()", function (a) {
            var b = this; if (!1 === a) return this.deselect(); this.iterator("cell", function (c, d, e) { x(c); d = c.aoData[d]; d._selected_cells === n && (d._selected_cells = []); d._selected_cells[e] = !0; d.anCells && h(d.anCells[e]).addClass(c._select.className) }); this.iterator("table", function (c, d) {
                r(b, "select",
                    ["cell", b.cells(b[d]).indexes().toArray()], !0)
            }); return this
        }); w("rows().deselect()", "row().deselect()", function () { var a = this; this.iterator("row", function (b, c) { b.aoData[c]._select_selected = !1; b._select_lastCell = null; h(b.aoData[c].nTr).removeClass(b._select.className) }); this.iterator("table", function (b, c) { r(a, "deselect", ["row", a[c]], !0) }); return this }); w("columns().deselect()", "column().deselect()", function () {
            var a = this; this.iterator("column", function (b, c) {
                b.aoColumns[c]._select_selected = !1; var d =
                    new m.Api(b), e = d.column(c); h(e.header()).removeClass(b._select.className); h(e.footer()).removeClass(b._select.className); d.cells(null, c).indexes().each(function (g) { var f = b.aoData[g.row], k = f._selected_cells; !f.anCells || k && k[g.column] || h(f.anCells[g.column]).removeClass(b._select.className) })
            }); this.iterator("table", function (b, c) { r(a, "deselect", ["column", a[c]], !0) }); return this
        }); w("cells().deselect()", "cell().deselect()", function () {
            var a = this; this.iterator("cell", function (b, c, d) {
                c = b.aoData[c]; c._selected_cells[d] =
                    !1; c.anCells && !b.aoColumns[d]._select_selected && h(c.anCells[d]).removeClass(b._select.className)
            }); this.iterator("table", function (b, c) { r(a, "deselect", ["cell", a[c]], !0) }); return this
        }); var D = 0; h.extend(m.ext.buttons, {
            selected: { text: y("selected", "Selected"), className: "buttons-selected", limitTo: ["rows", "columns", "cells"], init: function (a, b, c) { var d = this; c._eventNamespace = ".select" + D++; a.on(C(c), function () { d.enable(K(a, c)) }); this.disable() }, destroy: function (a, b, c) { a.off(c._eventNamespace) } }, selectedSingle: {
                text: y("selectedSingle",
                    "Selected single"), className: "buttons-selected-single", init: function (a, b, c) { var d = this; c._eventNamespace = ".select" + D++; a.on(C(c), function () { var e = a.rows({ selected: !0 }).flatten().length + a.columns({ selected: !0 }).flatten().length + a.cells({ selected: !0 }).flatten().length; d.enable(1 === e) }); this.disable() }, destroy: function (a, b, c) { a.off(c._eventNamespace) }
            }, selectAll: { text: y("selectAll", "Select all"), className: "buttons-select-all", action: function () { this[this.select.items() + "s"]().select() } }, selectNone: {
                text: y("selectNone",
                    "Deselect all"), className: "buttons-select-none", action: function () { x(this.settings()[0], !0) }, init: function (a, b, c) { var d = this; c._eventNamespace = ".select" + D++; a.on(C(c), function () { var e = a.rows({ selected: !0 }).flatten().length + a.columns({ selected: !0 }).flatten().length + a.cells({ selected: !0 }).flatten().length; d.enable(0 < e) }); this.disable() }, destroy: function (a, b, c) { a.off(c._eventNamespace) }
            }
        }); h.each(["Row", "Column", "Cell"], function (a, b) {
            var c = b.toLowerCase(); m.ext.buttons["select" + b + "s"] = {
                text: y("select" +
                    b + "s", "Select " + c + "s"), className: "buttons-select-" + c + "s", action: function () { this.select.items(c) }, init: function (d) { var e = this; d.on("selectItems.dt.DT", function (g, f, k) { e.active(k === c) }) }
            }
        }); h(t).on("preInit.dt.dtSelect", function (a, b) { "dt" === a.namespace && m.select.init(new m.Api(b)) }); return m.select
});