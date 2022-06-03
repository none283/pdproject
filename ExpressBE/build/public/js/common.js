/*! For license information please see common.d3402cd29e.js.LICENSE.txt */ ! function() {
    var e = {
            639: function(e) {
                class t {
                    constructor(e) {
                        e || console.error(`Event action is missing for ${this.action}, please add an action for object`), this.action = e, this.properties = {}
                    }
                    setCategory(e) {
                        e ? this.properties.event_category = e : console.error("Event category is required")
                    }
                    setLabel(e) {
                        e ? this.properties.event_label = e : console.error("Event label is required")
                    }
                    setField(e, t) {
                        e && null != t ? this.properties[e] = t : console.error(".setField() method is failed. Please add name or values params")
                    }
                    _collectGoogleAnalyticsKeys() {
                        return window.dataLayer ? window.dataLayer.map((function(e) {
                            if ("config" === e[0] && e.length >= 3 && !0 === e[2].analyticjs) return e[1]
                        })) : []
                    }
                    sendGA() {
                        const e = this.action,
                            t = this.properties;
                        this._collectGoogleAnalyticsKeys().forEach((function(n) {
                            let r = Object.assign({}, t);
                            if (n) {
                                r.send_to = n;
                                try {
                                    window.gtag("event", e, r)
                                } catch (e) {
                                    console.error(e)
                                }
                            }
                        }))
                    }
                    sendHeap() {
                        try {
                            window.heap.track(this.action, this.properties)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                    send() {
                        this.sendGA(), window.heap && this.sendHeap()
                    }
                }

                function n(e) {
                    let n = document.getElementsByClassName(e),
                        o = n.length,
                        a = "",
                        s = "",
                        u = "",
                        l = "",
                        c = i(o);
                    [...n].forEach(((e, n) => function(e, n) {
                        a = e.getAttribute("data-id"), l = e.getAttribute("data-uid"), s = n + 1, u = e.getAttribute("data-type");
                        let i = new t("ad_impression");
                        i.setCategory("ppc"), i.setField("provider_id", a), i.setField("position", s), i.setField("ad_category", c), i.setField("ad_format", u), i.setField("ad_event_id", l), "colored" === u && i.setField("ad_color", r(e));
                        i.send();
                        let o = new t("ad_impression_");
                        o.setCategory("ppc"), o.setField("provider_id", a), o.setField("position", s), o.setField("ad_category", c), o.setField("ad_format", u), o.setField("ad_event_id", l), "colored" === u && o.setField("ad_color", r(e));
                        o.send()
                    }(e, n)))
                }

                function r(e) {
                    let t = "";
                    switch (e.getAttribute("data-color")) {
                        case "1":
                            t = "blue (#288bbe)";
                            break;
                        case "2":
                            t = "red (#d3582d)";
                            break;
                        case "3":
                            t = "green (#007a6b)";
                            break;
                        case "4":
                            t = "lightblue (#3094ab)";
                            break;
                        case "5":
                            t = "yellow (#ee9c03)"
                    }
                    return t
                }

                function i(e) {
                    let t = "";
                    switch (e) {
                        case 1:
                            t = "Single ad";
                            break;
                        case 2:
                            t = "2 ads pack";
                            break;
                        case 3:
                            t = "3 ads pack"
                    }
                    return t
                }

                function o() {
                    if (!window.dataLayer) return [];
                    let e = "";
                    return window.dataLayer.forEach((function(t) {
                        "config" === t[0] && t[2] && !0 === t[2].adwords && (e = t[1])
                    })), e
                }
                e.exports = {
                    Event: t,
                    trackProviderView: function(e) {
                        if (!e) return void console.error("Provider id not specified");
                        let n = new t("Profile View");
                        n.setField("provider_id", e), n.send()
                    },
                    trackWebsiteClick: function(e, n, r = "", i = "Visit Website Click", o) {
                        if (!e) return void console.error("Provider id not specified");
                        let a = new t(i);
                        switch (a.setCategory("visit_website"), a.setLabel(e), a.setField("provider_id", e), void 0 !== n && a.setField("position", n), o && a.setField("link_text", o), r) {
                            case !1:
                            case "":
                                a.setField("is_sponsor", !1);
                                break;
                            case "featured":
                            case "sponsor":
                                a.setField("link_type", r), a.setField("is_sponsor", !0);
                                break;
                            case "recommendation":
                                a.setField("link_type", r), a.setField("is_sponsor", !1);
                                break;
                            default:
                                a.setField("link_type", r), a.setField("is_sponsor", r)
                        }
                        a.send()
                    },
                    trackAdClick: function(e, n, o, a) {
                        let s = document.querySelector(`[data-id='${e}']`),
                            u = document.querySelectorAll(".ppc_item").length;
                        if (!e) return void console.error("Provider id not specified");
                        if (!n) return void console.error("Position is not specified");
                        let l = new t("ad_click");
                        l.setCategory("ppc"), "colored" === a && l.setField("ad_color", r(s)), l.setField("provider_id", e), l.setField("ad_event_id", s.getAttribute("data-uid")), l.setField("ad_category", i(u)), l.setField("position", n), l.setField("link_text", o), l.setField("ad_format", a), l.send();
                        let c = new t("ad_click_");
                        c.setCategory("ppc"), "colored" === a && c.setField("ad_color", r(s)), c.setField("provider_id", e), c.setField("ad_event_id", s.getAttribute("data-uid")), c.setField("ad_category", i(u)), c.setField("position", n), c.setField("link_text", o), c.setField("ad_format", a), c.send()
                    },
                    trackingAdCTR: function(e) {
                        n(e)
                    },
                    trackingAdImpressions: n,
                    setUserProperty: function(e, t) {
                        window.gtag && window.gtag("set", "user_properties", {
                            [e]: t
                        }), window.heap && window.heap.addUserProperties({
                            [e]: t
                        })
                    },
                    trackScroll: function(e, n) {
                        document.body.clientHeight > window.innerHeight ? window.addEventListener("scroll", (function r() {
                            const i = document.documentElement,
                                o = document.body,
                                a = "scrollTop",
                                s = "scrollHeight",
                                u = Math.floor((i[a] || o[a]) / ((i[s] || o[s]) - i.clientHeight) * 100);
                            if (u >= e) {
                                window.removeEventListener("scroll", r), n();
                                const e = new t("user_scroll_engagement");
                                e.setField("scroll_depth", u), e.send()
                            }
                        })) : setTimeout((function() {
                            new t("user_timer_engagement").send()
                        }), e / 5)
                    },
                    sisterTracking: function(e, t = "production", n = 0) {
                        document.cookie.split("; ").find((e => e.startsWith("visited_sister_site"))) || setTimeout((function() {
                            let n = document.cookie.split("; ").filter((e => e.startsWith("_ga="))).map((e => e.slice(4))),
                                r = "";
                            if (!n) return;
                            r = n[0];
                            let i = "https://clutch.co";
                            "production" !== t && (i = "https://staging.clutch.co");
                            let o = document.createElement("iframe");
                            o.src = `${i}/t/ps?client_id=${r}&event_name=${e}&domain=${window.location.host}`, o.id = "track_frame", o.width = "0", o.height = "0", o.style.border = "none", o.style.background = "transparent", document.body.appendChild(o), document.querySelector("#track_frame").addEventListener("load", (function() {
                                const e = new Date;
                                e.setTime(e.getTime() + 31536e6);
                                let t = "expires=" + e.toUTCString();
                                document.cookie = `visited_sister_site=true; ${t}`
                            }))
                        }), n)
                    },
                    trackConversion: function(e, t) {
                        let n;
                        t && (n = t()), window.gtag("event", "conversion", {
                            send_to: `${o()}/${e}`,
                            event_callback: n
                        })
                    }
                }
            },
            999: function() {
                $(document).ready((function() {
                    var e, t, n = $("body"),
                        r = $("#manifest-header"),
                        i = $(".global-navigation"),
                        o = $(".global-navigation__direction"),
                        a = "header__navigation-button",
                        s = "show-navigation",
                        u = "disabled-scroll",
                        l = !1,
                        c = !1;

                    function f() {
                        l || (l = !0, r.off("mouseenter.navigationDirectionHover"), r.off("mouseenter.navigationDirectionUnhover"), r.off("click.navigationDirectionClick"), i.off("mouseleave"), "desktop" === e ? (r.on("mouseenter.navigationDirectionHover", ".global-navigation__direction-name", (function(e) {
                            e.stopPropagation;
                            var n = $(this);
                            t = setTimeout((function() {
                                p(), n.parent().addClass("active")
                            }), 300), r.on("mouseleave.navigationDirectionUnhover", ".global-navigation__direction-name", (function() {
                                clearTimeout(t)
                            }))
                        })), i.on("mouseleave", (function() {
                            p()
                        }))) : r.on("click.navigationDirectionClick", ".global-navigation__direction-name", (function(e) {
                            e.stopPropagation(), $(this).parent().toggleClass("active")
                        })))
                    }

                    function d() {
                        var e = window.innerHeight - r.height();
                        i.css("max-height", "".concat(e, "px"))
                    }

                    function p() {
                        o.removeClass("active")
                    }

                    function h() {
                        n.removeClass(u), r.removeClass(s), p(), c = !1
                    }

                    function g() {
                        window.innerWidth < 1200 ? ("desktop" === e && (l = !1), e = "mobile") : ("mobile" === e && (l = !1), e = "desktop")
                    }
                    g(), f(), "mobile" === e && d(), $(window).on("resize", (function() {
                        g(), f(), h(), "mobile" === e && d()
                    })), $(window).on("orientationchange", (function() {
                        "mobile" === e && d()
                    })), $(document).on("click keyup", (function(e) {
                        !c || (e.target.closest(".".concat(a)) || e.target.closest(".global-navigation")) && 27 !== e.keyCode || h()
                    })), r.on("click.navigationButtonClick", ".".concat(a), (function() {
                        c ? h() : (n.addClass(u), r.addClass(s), c = !0)
                    }))
                }))
            },
            732: function() {
                $(document).ready((function() {
                    var e = $("#manifest-header"),
                        t = $("#manifest-sticky-header");

                    function n() {
                        var n = e.height();
                        $(window).scrollTop() > n ? t.fadeIn(150) : t.fadeOut(150)
                    }
                    n(), $(window).scroll((function() {
                        n()
                    }))
                }))
            },
            74: function(e, t, n) {
                var r = n(755),
                    i = n(672);
                i.$ = r, i.jQuery = r, e.exports = r
            },
            672: function(e, t, n) {
                "use strict";
                e.exports = function() {
                    if ("object" == typeof globalThis) return globalThis;
                    var e;
                    try {
                        e = this || new Function("return this")()
                    } catch (e) {
                        if ("object" == typeof window) return window;
                        if ("object" == typeof self) return self;
                        if (void 0 !== n.g) return n.g
                    }
                    return e
                }()
            },
            755: function(e, t) {
                var n;
                ! function(t, n) {
                    "use strict";
                    "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(e) {
                        if (!e.document) throw new Error("jQuery requires a window with a document");
                        return n(e)
                    } : n(t)
                }("undefined" != typeof window ? window : this, (function(r, i) {
                    "use strict";
                    var o = [],
                        a = Object.getPrototypeOf,
                        s = o.slice,
                        u = o.flat ? function(e) {
                            return o.flat.call(e)
                        } : function(e) {
                            return o.concat.apply([], e)
                        },
                        l = o.push,
                        c = o.indexOf,
                        f = {},
                        d = f.toString,
                        p = f.hasOwnProperty,
                        h = p.toString,
                        g = h.call(Object),
                        v = {},
                        m = function(e) {
                            return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
                        },
                        y = function(e) {
                            return null != e && e === e.window
                        },
                        x = r.document,
                        b = {
                            type: !0,
                            src: !0,
                            nonce: !0,
                            noModule: !0
                        };

                    function w(e, t, n) {
                        var r, i, o = (n = n || x).createElement("script");
                        if (o.text = e, t)
                            for (r in b)(i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
                        n.head.appendChild(o).parentNode.removeChild(o)
                    }

                    function T(e) {
                        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? f[d.call(e)] || "object" : typeof e
                    }
                    var C = "3.6.0",
                        k = function(e, t) {
                            return new k.fn.init(e, t)
                        };

                    function E(e) {
                        var t = !!e && "length" in e && e.length,
                            n = T(e);
                        return !m(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
                    }
                    k.fn = k.prototype = {
                        jquery: C,
                        constructor: k,
                        length: 0,
                        toArray: function() {
                            return s.call(this)
                        },
                        get: function(e) {
                            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
                        },
                        pushStack: function(e) {
                            var t = k.merge(this.constructor(), e);
                            return t.prevObject = this, t
                        },
                        each: function(e) {
                            return k.each(this, e)
                        },
                        map: function(e) {
                            return this.pushStack(k.map(this, (function(t, n) {
                                return e.call(t, n, t)
                            })))
                        },
                        slice: function() {
                            return this.pushStack(s.apply(this, arguments))
                        },
                        first: function() {
                            return this.eq(0)
                        },
                        last: function() {
                            return this.eq(-1)
                        },
                        even: function() {
                            return this.pushStack(k.grep(this, (function(e, t) {
                                return (t + 1) % 2
                            })))
                        },
                        odd: function() {
                            return this.pushStack(k.grep(this, (function(e, t) {
                                return t % 2
                            })))
                        },
                        eq: function(e) {
                            var t = this.length,
                                n = +e + (e < 0 ? t : 0);
                            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                        },
                        end: function() {
                            return this.prevObject || this.constructor()
                        },
                        push: l,
                        sort: o.sort,
                        splice: o.splice
                    }, k.extend = k.fn.extend = function() {
                        var e, t, n, r, i, o, a = arguments[0] || {},
                            s = 1,
                            u = arguments.length,
                            l = !1;
                        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
                            if (null != (e = arguments[s]))
                                for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (k.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || k.isPlainObject(n) ? n : {}, i = !1, a[t] = k.extend(l, o, r)) : void 0 !== r && (a[t] = r));
                        return a
                    }, k.extend({
                        expando: "jQuery" + (C + Math.random()).replace(/\D/g, ""),
                        isReady: !0,
                        error: function(e) {
                            throw new Error(e)
                        },
                        noop: function() {},
                        isPlainObject: function(e) {
                            var t, n;
                            return !(!e || "[object Object]" !== d.call(e)) && (!(t = a(e)) || "function" == typeof(n = p.call(t, "constructor") && t.constructor) && h.call(n) === g)
                        },
                        isEmptyObject: function(e) {
                            var t;
                            for (t in e) return !1;
                            return !0
                        },
                        globalEval: function(e, t, n) {
                            w(e, {
                                nonce: t && t.nonce
                            }, n)
                        },
                        each: function(e, t) {
                            var n, r = 0;
                            if (E(e))
                                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
                            else
                                for (r in e)
                                    if (!1 === t.call(e[r], r, e[r])) break;
                            return e
                        },
                        makeArray: function(e, t) {
                            var n = t || [];
                            return null != e && (E(Object(e)) ? k.merge(n, "string" == typeof e ? [e] : e) : l.call(n, e)), n
                        },
                        inArray: function(e, t, n) {
                            return null == t ? -1 : c.call(t, e, n)
                        },
                        merge: function(e, t) {
                            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
                            return e.length = i, e
                        },
                        grep: function(e, t, n) {
                            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
                            return r
                        },
                        map: function(e, t, n) {
                            var r, i, o = 0,
                                a = [];
                            if (E(e))
                                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
                            else
                                for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
                            return u(a)
                        },
                        guid: 1,
                        support: v
                    }), "function" == typeof Symbol && (k.fn[Symbol.iterator] = o[Symbol.iterator]), k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                        f["[object " + t + "]"] = t.toLowerCase()
                    }));
                    var S = function(e) {
                        var t, n, r, i, o, a, s, u, l, c, f, d, p, h, g, v, m, y, x, b = "sizzle" + 1 * new Date,
                            w = e.document,
                            T = 0,
                            C = 0,
                            k = ue(),
                            E = ue(),
                            S = ue(),
                            A = ue(),
                            N = function(e, t) {
                                return e === t && (f = !0), 0
                            },
                            D = {}.hasOwnProperty,
                            j = [],
                            L = j.pop,
                            q = j.push,
                            H = j.push,
                            O = j.slice,
                            P = function(e, t) {
                                for (var n = 0, r = e.length; n < r; n++)
                                    if (e[n] === t) return n;
                                return -1
                            },
                            _ = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                            R = "[\\x20\\t\\r\\n\\f]",
                            F = "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                            M = "\\[[\\x20\\t\\r\\n\\f]*(" + F + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + F + "))|)" + R + "*\\]",
                            I = ":(" + F + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
                            $ = new RegExp(R + "+", "g"),
                            W = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"),
                            B = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"),
                            z = new RegExp("^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"),
                            U = new RegExp(R + "|>"),
                            X = new RegExp(I),
                            V = new RegExp("^" + F + "$"),
                            G = {
                                ID: new RegExp("^#(" + F + ")"),
                                CLASS: new RegExp("^\\.(" + F + ")"),
                                TAG: new RegExp("^(" + F + "|[*])"),
                                ATTR: new RegExp("^" + M),
                                PSEUDO: new RegExp("^" + I),
                                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
                                bool: new RegExp("^(?:" + _ + ")$", "i"),
                                needsContext: new RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
                            },
                            Y = /HTML$/i,
                            Q = /^(?:input|select|textarea|button)$/i,
                            J = /^h\d$/i,
                            K = /^[^{]+\{\s*\[native \w/,
                            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                            ee = /[+~]/,
                            te = new RegExp("\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])", "g"),
                            ne = function(e, t) {
                                var n = "0x" + e.slice(1) - 65536;
                                return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
                            },
                            re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                            ie = function(e, t) {
                                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                            },
                            oe = function() {
                                d()
                            },
                            ae = be((function(e) {
                                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                            }), {
                                dir: "parentNode",
                                next: "legend"
                            });
                        try {
                            H.apply(j = O.call(w.childNodes), w.childNodes), j[w.childNodes.length].nodeType
                        } catch (e) {
                            H = {
                                apply: j.length ? function(e, t) {
                                    q.apply(e, O.call(t))
                                } : function(e, t) {
                                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                                    e.length = n - 1
                                }
                            }
                        }

                        function se(e, t, r, i) {
                            var o, s, l, c, f, h, m, y = t && t.ownerDocument,
                                w = t ? t.nodeType : 9;
                            if (r = r || [], "string" != typeof e || !e || 1 !== w && 9 !== w && 11 !== w) return r;
                            if (!i && (d(t), t = t || p, g)) {
                                if (11 !== w && (f = Z.exec(e)))
                                    if (o = f[1]) {
                                        if (9 === w) {
                                            if (!(l = t.getElementById(o))) return r;
                                            if (l.id === o) return r.push(l), r
                                        } else if (y && (l = y.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r
                                    } else {
                                        if (f[2]) return H.apply(r, t.getElementsByTagName(e)), r;
                                        if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return H.apply(r, t.getElementsByClassName(o)), r
                                    }
                                if (n.qsa && !A[e + " "] && (!v || !v.test(e)) && (1 !== w || "object" !== t.nodeName.toLowerCase())) {
                                    if (m = e, y = t, 1 === w && (U.test(e) || z.test(e))) {
                                        for ((y = ee.test(e) && me(t.parentNode) || t) === t && n.scope || ((c = t.getAttribute("id")) ? c = c.replace(re, ie) : t.setAttribute("id", c = b)), s = (h = a(e)).length; s--;) h[s] = (c ? "#" + c : ":scope") + " " + xe(h[s]);
                                        m = h.join(",")
                                    }
                                    try {
                                        return H.apply(r, y.querySelectorAll(m)), r
                                    } catch (t) {
                                        A(e, !0)
                                    } finally {
                                        c === b && t.removeAttribute("id")
                                    }
                                }
                            }
                            return u(e.replace(W, "$1"), t, r, i)
                        }

                        function ue() {
                            var e = [];
                            return function t(n, i) {
                                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                            }
                        }

                        function le(e) {
                            return e[b] = !0, e
                        }

                        function ce(e) {
                            var t = p.createElement("fieldset");
                            try {
                                return !!e(t)
                            } catch (e) {
                                return !1
                            } finally {
                                t.parentNode && t.parentNode.removeChild(t), t = null
                            }
                        }

                        function fe(e, t) {
                            for (var n = e.split("|"), i = n.length; i--;) r.attrHandle[n[i]] = t
                        }

                        function de(e, t) {
                            var n = t && e,
                                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                            if (r) return r;
                            if (n)
                                for (; n = n.nextSibling;)
                                    if (n === t) return -1;
                            return e ? 1 : -1
                        }

                        function pe(e) {
                            return function(t) {
                                return "input" === t.nodeName.toLowerCase() && t.type === e
                            }
                        }

                        function he(e) {
                            return function(t) {
                                var n = t.nodeName.toLowerCase();
                                return ("input" === n || "button" === n) && t.type === e
                            }
                        }

                        function ge(e) {
                            return function(t) {
                                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label" in t && t.disabled === e
                            }
                        }

                        function ve(e) {
                            return le((function(t) {
                                return t = +t, le((function(n, r) {
                                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                                }))
                            }))
                        }

                        function me(e) {
                            return e && void 0 !== e.getElementsByTagName && e
                        }
                        for (t in n = se.support = {}, o = se.isXML = function(e) {
                                var t = e && e.namespaceURI,
                                    n = e && (e.ownerDocument || e).documentElement;
                                return !Y.test(t || n && n.nodeName || "HTML")
                            }, d = se.setDocument = function(e) {
                                var t, i, a = e ? e.ownerDocument || e : w;
                                return a != p && 9 === a.nodeType && a.documentElement ? (h = (p = a).documentElement, g = !o(p), w != p && (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", oe, !1) : i.attachEvent && i.attachEvent("onunload", oe)), n.scope = ce((function(e) {
                                    return h.appendChild(e).appendChild(p.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                                })), n.attributes = ce((function(e) {
                                    return e.className = "i", !e.getAttribute("className")
                                })), n.getElementsByTagName = ce((function(e) {
                                    return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
                                })), n.getElementsByClassName = K.test(p.getElementsByClassName), n.getById = ce((function(e) {
                                    return h.appendChild(e).id = b, !p.getElementsByName || !p.getElementsByName(b).length
                                })), n.getById ? (r.filter.ID = function(e) {
                                    var t = e.replace(te, ne);
                                    return function(e) {
                                        return e.getAttribute("id") === t
                                    }
                                }, r.find.ID = function(e, t) {
                                    if (void 0 !== t.getElementById && g) {
                                        var n = t.getElementById(e);
                                        return n ? [n] : []
                                    }
                                }) : (r.filter.ID = function(e) {
                                    var t = e.replace(te, ne);
                                    return function(e) {
                                        var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                        return n && n.value === t
                                    }
                                }, r.find.ID = function(e, t) {
                                    if (void 0 !== t.getElementById && g) {
                                        var n, r, i, o = t.getElementById(e);
                                        if (o) {
                                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                                            for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                                                if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                                        }
                                        return []
                                    }
                                }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                                } : function(e, t) {
                                    var n, r = [],
                                        i = 0,
                                        o = t.getElementsByTagName(e);
                                    if ("*" === e) {
                                        for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                                        return r
                                    }
                                    return o
                                }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                                    if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e)
                                }, m = [], v = [], (n.qsa = K.test(p.querySelectorAll)) && (ce((function(e) {
                                    var t;
                                    h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|" + _ + ")"), e.querySelectorAll("[id~=" + b + "-]").length || v.push("~="), (t = p.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]")
                                })), ce((function(e) {
                                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                    var t = p.createElement("input");
                                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
                                }))), (n.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ce((function(e) {
                                    n.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), m.push("!=", I)
                                })), v = v.length && new RegExp(v.join("|")), m = m.length && new RegExp(m.join("|")), t = K.test(h.compareDocumentPosition), x = t || K.test(h.contains) ? function(e, t) {
                                    var n = 9 === e.nodeType ? e.documentElement : e,
                                        r = t && t.parentNode;
                                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                                } : function(e, t) {
                                    if (t)
                                        for (; t = t.parentNode;)
                                            if (t === e) return !0;
                                    return !1
                                }, N = t ? function(e, t) {
                                    if (e === t) return f = !0, 0;
                                    var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                    return r || (1 & (r = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e == p || e.ownerDocument == w && x(w, e) ? -1 : t == p || t.ownerDocument == w && x(w, t) ? 1 : c ? P(c, e) - P(c, t) : 0 : 4 & r ? -1 : 1)
                                } : function(e, t) {
                                    if (e === t) return f = !0, 0;
                                    var n, r = 0,
                                        i = e.parentNode,
                                        o = t.parentNode,
                                        a = [e],
                                        s = [t];
                                    if (!i || !o) return e == p ? -1 : t == p ? 1 : i ? -1 : o ? 1 : c ? P(c, e) - P(c, t) : 0;
                                    if (i === o) return de(e, t);
                                    for (n = e; n = n.parentNode;) a.unshift(n);
                                    for (n = t; n = n.parentNode;) s.unshift(n);
                                    for (; a[r] === s[r];) r++;
                                    return r ? de(a[r], s[r]) : a[r] == w ? -1 : s[r] == w ? 1 : 0
                                }, p) : p
                            }, se.matches = function(e, t) {
                                return se(e, null, null, t)
                            }, se.matchesSelector = function(e, t) {
                                if (d(e), n.matchesSelector && g && !A[t + " "] && (!m || !m.test(t)) && (!v || !v.test(t))) try {
                                    var r = y.call(e, t);
                                    if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                                } catch (e) {
                                    A(t, !0)
                                }
                                return se(t, p, null, [e]).length > 0
                            }, se.contains = function(e, t) {
                                return (e.ownerDocument || e) != p && d(e), x(e, t)
                            }, se.attr = function(e, t) {
                                (e.ownerDocument || e) != p && d(e);
                                var i = r.attrHandle[t.toLowerCase()],
                                    o = i && D.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
                                return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
                            }, se.escape = function(e) {
                                return (e + "").replace(re, ie)
                            }, se.error = function(e) {
                                throw new Error("Syntax error, unrecognized expression: " + e)
                            }, se.uniqueSort = function(e) {
                                var t, r = [],
                                    i = 0,
                                    o = 0;
                                if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(N), f) {
                                    for (; t = e[o++];) t === e[o] && (i = r.push(o));
                                    for (; i--;) e.splice(r[i], 1)
                                }
                                return c = null, e
                            }, i = se.getText = function(e) {
                                var t, n = "",
                                    r = 0,
                                    o = e.nodeType;
                                if (o) {
                                    if (1 === o || 9 === o || 11 === o) {
                                        if ("string" == typeof e.textContent) return e.textContent;
                                        for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                                    } else if (3 === o || 4 === o) return e.nodeValue
                                } else
                                    for (; t = e[r++];) n += i(t);
                                return n
                            }, r = se.selectors = {
                                cacheLength: 50,
                                createPseudo: le,
                                match: G,
                                attrHandle: {},
                                find: {},
                                relative: {
                                    ">": {
                                        dir: "parentNode",
                                        first: !0
                                    },
                                    " ": {
                                        dir: "parentNode"
                                    },
                                    "+": {
                                        dir: "previousSibling",
                                        first: !0
                                    },
                                    "~": {
                                        dir: "previousSibling"
                                    }
                                },
                                preFilter: {
                                    ATTR: function(e) {
                                        return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                                    },
                                    CHILD: function(e) {
                                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e
                                    },
                                    PSEUDO: function(e) {
                                        var t, n = !e[6] && e[2];
                                        return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                                    }
                                },
                                filter: {
                                    TAG: function(e) {
                                        var t = e.replace(te, ne).toLowerCase();
                                        return "*" === e ? function() {
                                            return !0
                                        } : function(e) {
                                            return e.nodeName && e.nodeName.toLowerCase() === t
                                        }
                                    },
                                    CLASS: function(e) {
                                        var t = k[e + " "];
                                        return t || (t = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + e + "(" + R + "|$)")) && k(e, (function(e) {
                                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                        }))
                                    },
                                    ATTR: function(e, t, n) {
                                        return function(r) {
                                            var i = se.attr(r, e);
                                            return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                                        }
                                    },
                                    CHILD: function(e, t, n, r, i) {
                                        var o = "nth" !== e.slice(0, 3),
                                            a = "last" !== e.slice(-4),
                                            s = "of-type" === t;
                                        return 1 === r && 0 === i ? function(e) {
                                            return !!e.parentNode
                                        } : function(t, n, u) {
                                            var l, c, f, d, p, h, g = o !== a ? "nextSibling" : "previousSibling",
                                                v = t.parentNode,
                                                m = s && t.nodeName.toLowerCase(),
                                                y = !u && !s,
                                                x = !1;
                                            if (v) {
                                                if (o) {
                                                    for (; g;) {
                                                        for (d = t; d = d[g];)
                                                            if (s ? d.nodeName.toLowerCase() === m : 1 === d.nodeType) return !1;
                                                        h = g = "only" === e && !h && "nextSibling"
                                                    }
                                                    return !0
                                                }
                                                if (h = [a ? v.firstChild : v.lastChild], a && y) {
                                                    for (x = (p = (l = (c = (f = (d = v)[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], d = p && v.childNodes[p]; d = ++p && d && d[g] || (x = p = 0) || h.pop();)
                                                        if (1 === d.nodeType && ++x && d === t) {
                                                            c[e] = [T, p, x];
                                                            break
                                                        }
                                                } else if (y && (x = p = (l = (c = (f = (d = t)[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x)
                                                    for (;
                                                        (d = ++p && d && d[g] || (x = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++x || (y && ((c = (f = d[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] = [T, x]), d !== t)););
                                                return (x -= i) === r || x % r == 0 && x / r >= 0
                                            }
                                        }
                                    },
                                    PSEUDO: function(e, t) {
                                        var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                                        return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? le((function(e, n) {
                                            for (var r, o = i(e, t), a = o.length; a--;) e[r = P(e, o[a])] = !(n[r] = o[a])
                                        })) : function(e) {
                                            return i(e, 0, n)
                                        }) : i
                                    }
                                },
                                pseudos: {
                                    not: le((function(e) {
                                        var t = [],
                                            n = [],
                                            r = s(e.replace(W, "$1"));
                                        return r[b] ? le((function(e, t, n, i) {
                                            for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                                        })) : function(e, i, o) {
                                            return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                                        }
                                    })),
                                    has: le((function(e) {
                                        return function(t) {
                                            return se(e, t).length > 0
                                        }
                                    })),
                                    contains: le((function(e) {
                                        return e = e.replace(te, ne),
                                            function(t) {
                                                return (t.textContent || i(t)).indexOf(e) > -1
                                            }
                                    })),
                                    lang: le((function(e) {
                                        return V.test(e || "") || se.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
                                            function(t) {
                                                var n;
                                                do {
                                                    if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                                return !1
                                            }
                                    })),
                                    target: function(t) {
                                        var n = e.location && e.location.hash;
                                        return n && n.slice(1) === t.id
                                    },
                                    root: function(e) {
                                        return e === h
                                    },
                                    focus: function(e) {
                                        return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                    },
                                    enabled: ge(!1),
                                    disabled: ge(!0),
                                    checked: function(e) {
                                        var t = e.nodeName.toLowerCase();
                                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                                    },
                                    selected: function(e) {
                                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                                    },
                                    empty: function(e) {
                                        for (e = e.firstChild; e; e = e.nextSibling)
                                            if (e.nodeType < 6) return !1;
                                        return !0
                                    },
                                    parent: function(e) {
                                        return !r.pseudos.empty(e)
                                    },
                                    header: function(e) {
                                        return J.test(e.nodeName)
                                    },
                                    input: function(e) {
                                        return Q.test(e.nodeName)
                                    },
                                    button: function(e) {
                                        var t = e.nodeName.toLowerCase();
                                        return "input" === t && "button" === e.type || "button" === t
                                    },
                                    text: function(e) {
                                        var t;
                                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                                    },
                                    first: ve((function() {
                                        return [0]
                                    })),
                                    last: ve((function(e, t) {
                                        return [t - 1]
                                    })),
                                    eq: ve((function(e, t, n) {
                                        return [n < 0 ? n + t : n]
                                    })),
                                    even: ve((function(e, t) {
                                        for (var n = 0; n < t; n += 2) e.push(n);
                                        return e
                                    })),
                                    odd: ve((function(e, t) {
                                        for (var n = 1; n < t; n += 2) e.push(n);
                                        return e
                                    })),
                                    lt: ve((function(e, t, n) {
                                        for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0;) e.push(r);
                                        return e
                                    })),
                                    gt: ve((function(e, t, n) {
                                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                                        return e
                                    }))
                                }
                            }, r.pseudos.nth = r.pseudos.eq, {
                                radio: !0,
                                checkbox: !0,
                                file: !0,
                                password: !0,
                                image: !0
                            }) r.pseudos[t] = pe(t);
                        for (t in {
                                submit: !0,
                                reset: !0
                            }) r.pseudos[t] = he(t);

                        function ye() {}

                        function xe(e) {
                            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                            return r
                        }

                        function be(e, t, n) {
                            var r = t.dir,
                                i = t.next,
                                o = i || r,
                                a = n && "parentNode" === o,
                                s = C++;
                            return t.first ? function(t, n, i) {
                                for (; t = t[r];)
                                    if (1 === t.nodeType || a) return e(t, n, i);
                                return !1
                            } : function(t, n, u) {
                                var l, c, f, d = [T, s];
                                if (u) {
                                    for (; t = t[r];)
                                        if ((1 === t.nodeType || a) && e(t, n, u)) return !0
                                } else
                                    for (; t = t[r];)
                                        if (1 === t.nodeType || a)
                                            if (c = (f = t[b] || (t[b] = {}))[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                                            else {
                                                if ((l = c[o]) && l[0] === T && l[1] === s) return d[2] = l[2];
                                                if (c[o] = d, d[2] = e(t, n, u)) return !0
                                            } return !1
                            }
                        }

                        function we(e) {
                            return e.length > 1 ? function(t, n, r) {
                                for (var i = e.length; i--;)
                                    if (!e[i](t, n, r)) return !1;
                                return !0
                            } : e[0]
                        }

                        function Te(e, t, n, r, i) {
                            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
                            return a
                        }

                        function Ce(e, t, n, r, i, o) {
                            return r && !r[b] && (r = Ce(r)), i && !i[b] && (i = Ce(i, o)), le((function(o, a, s, u) {
                                var l, c, f, d = [],
                                    p = [],
                                    h = a.length,
                                    g = o || function(e, t, n) {
                                        for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                                        return n
                                    }(t || "*", s.nodeType ? [s] : s, []),
                                    v = !e || !o && t ? g : Te(g, d, e, s, u),
                                    m = n ? i || (o ? e : h || r) ? [] : a : v;
                                if (n && n(v, m, s, u), r)
                                    for (l = Te(m, p), r(l, [], s, u), c = l.length; c--;)(f = l[c]) && (m[p[c]] = !(v[p[c]] = f));
                                if (o) {
                                    if (i || e) {
                                        if (i) {
                                            for (l = [], c = m.length; c--;)(f = m[c]) && l.push(v[c] = f);
                                            i(null, m = [], l, u)
                                        }
                                        for (c = m.length; c--;)(f = m[c]) && (l = i ? P(o, f) : d[c]) > -1 && (o[l] = !(a[l] = f))
                                    }
                                } else m = Te(m === a ? m.splice(h, m.length) : m), i ? i(null, a, m, u) : H.apply(a, m)
                            }))
                        }

                        function ke(e) {
                            for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = be((function(e) {
                                    return e === t
                                }), s, !0), f = be((function(e) {
                                    return P(t, e) > -1
                                }), s, !0), d = [function(e, n, r) {
                                    var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
                                    return t = null, i
                                }]; u < o; u++)
                                if (n = r.relative[e[u].type]) d = [be(we(d), n)];
                                else {
                                    if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                                        for (i = ++u; i < o && !r.relative[e[i].type]; i++);
                                        return Ce(u > 1 && we(d), u > 1 && xe(e.slice(0, u - 1).concat({
                                            value: " " === e[u - 2].type ? "*" : ""
                                        })).replace(W, "$1"), n, u < i && ke(e.slice(u, i)), i < o && ke(e = e.slice(i)), i < o && xe(e))
                                    }
                                    d.push(n)
                                }
                            return we(d)
                        }
                        return ye.prototype = r.filters = r.pseudos, r.setFilters = new ye, a = se.tokenize = function(e, t) {
                            var n, i, o, a, s, u, l, c = E[e + " "];
                            if (c) return t ? 0 : c.slice(0);
                            for (s = e, u = [], l = r.preFilter; s;) {
                                for (a in n && !(i = B.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = z.exec(s)) && (n = i.shift(), o.push({
                                        value: n,
                                        type: i[0].replace(W, " ")
                                    }), s = s.slice(n.length)), r.filter) !(i = G[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({
                                    value: n,
                                    type: a,
                                    matches: i
                                }), s = s.slice(n.length));
                                if (!n) break
                            }
                            return t ? s.length : s ? se.error(e) : E(e, u).slice(0)
                        }, s = se.compile = function(e, t) {
                            var n, i = [],
                                o = [],
                                s = S[e + " "];
                            if (!s) {
                                for (t || (t = a(e)), n = t.length; n--;)(s = ke(t[n]))[b] ? i.push(s) : o.push(s);
                                s = S(e, function(e, t) {
                                    var n = t.length > 0,
                                        i = e.length > 0,
                                        o = function(o, a, s, u, c) {
                                            var f, h, v, m = 0,
                                                y = "0",
                                                x = o && [],
                                                b = [],
                                                w = l,
                                                C = o || i && r.find.TAG("*", c),
                                                k = T += null == w ? 1 : Math.random() || .1,
                                                E = C.length;
                                            for (c && (l = a == p || a || c); y !== E && null != (f = C[y]); y++) {
                                                if (i && f) {
                                                    for (h = 0, a || f.ownerDocument == p || (d(f), s = !g); v = e[h++];)
                                                        if (v(f, a || p, s)) {
                                                            u.push(f);
                                                            break
                                                        }
                                                    c && (T = k)
                                                }
                                                n && ((f = !v && f) && m--, o && x.push(f))
                                            }
                                            if (m += y, n && y !== m) {
                                                for (h = 0; v = t[h++];) v(x, b, a, s);
                                                if (o) {
                                                    if (m > 0)
                                                        for (; y--;) x[y] || b[y] || (b[y] = L.call(u));
                                                    b = Te(b)
                                                }
                                                H.apply(u, b), c && !o && b.length > 0 && m + t.length > 1 && se.uniqueSort(u)
                                            }
                                            return c && (T = k, l = w), x
                                        };
                                    return n ? le(o) : o
                                }(o, i)), s.selector = e
                            }
                            return s
                        }, u = se.select = function(e, t, n, i) {
                            var o, u, l, c, f, d = "function" == typeof e && e,
                                p = !i && a(e = d.selector || e);
                            if (n = n || [], 1 === p.length) {
                                if ((u = p[0] = p[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
                                    if (!(t = (r.find.ID(l.matches[0].replace(te, ne), t) || [])[0])) return n;
                                    d && (t = t.parentNode), e = e.slice(u.shift().value.length)
                                }
                                for (o = G.needsContext.test(e) ? 0 : u.length; o-- && (l = u[o], !r.relative[c = l.type]);)
                                    if ((f = r.find[c]) && (i = f(l.matches[0].replace(te, ne), ee.test(u[0].type) && me(t.parentNode) || t))) {
                                        if (u.splice(o, 1), !(e = i.length && xe(u))) return H.apply(n, i), n;
                                        break
                                    }
                            }
                            return (d || s(e, p))(i, t, !g, n, !t || ee.test(e) && me(t.parentNode) || t), n
                        }, n.sortStable = b.split("").sort(N).join("") === b, n.detectDuplicates = !!f, d(), n.sortDetached = ce((function(e) {
                            return 1 & e.compareDocumentPosition(p.createElement("fieldset"))
                        })), ce((function(e) {
                            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                        })) || fe("type|href|height|width", (function(e, t, n) {
                            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                        })), n.attributes && ce((function(e) {
                            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                        })) || fe("value", (function(e, t, n) {
                            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                        })), ce((function(e) {
                            return null == e.getAttribute("disabled")
                        })) || fe(_, (function(e, t, n) {
                            var r;
                            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                        })), se
                    }(r);
                    k.find = S, k.expr = S.selectors, k.expr[":"] = k.expr.pseudos, k.uniqueSort = k.unique = S.uniqueSort, k.text = S.getText, k.isXMLDoc = S.isXML, k.contains = S.contains, k.escapeSelector = S.escape;
                    var A = function(e, t, n) {
                            for (var r = [], i = void 0 !== n;
                                (e = e[t]) && 9 !== e.nodeType;)
                                if (1 === e.nodeType) {
                                    if (i && k(e).is(n)) break;
                                    r.push(e)
                                }
                            return r
                        },
                        N = function(e, t) {
                            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                            return n
                        },
                        D = k.expr.match.needsContext;

                    function j(e, t) {
                        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                    }
                    var L = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

                    function q(e, t, n) {
                        return m(t) ? k.grep(e, (function(e, r) {
                            return !!t.call(e, r, e) !== n
                        })) : t.nodeType ? k.grep(e, (function(e) {
                            return e === t !== n
                        })) : "string" != typeof t ? k.grep(e, (function(e) {
                            return c.call(t, e) > -1 !== n
                        })) : k.filter(t, e, n)
                    }
                    k.filter = function(e, t, n) {
                        var r = t[0];
                        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? k.find.matchesSelector(r, e) ? [r] : [] : k.find.matches(e, k.grep(t, (function(e) {
                            return 1 === e.nodeType
                        })))
                    }, k.fn.extend({
                        find: function(e) {
                            var t, n, r = this.length,
                                i = this;
                            if ("string" != typeof e) return this.pushStack(k(e).filter((function() {
                                for (t = 0; t < r; t++)
                                    if (k.contains(i[t], this)) return !0
                            })));
                            for (n = this.pushStack([]), t = 0; t < r; t++) k.find(e, i[t], n);
                            return r > 1 ? k.uniqueSort(n) : n
                        },
                        filter: function(e) {
                            return this.pushStack(q(this, e || [], !1))
                        },
                        not: function(e) {
                            return this.pushStack(q(this, e || [], !0))
                        },
                        is: function(e) {
                            return !!q(this, "string" == typeof e && D.test(e) ? k(e) : e || [], !1).length
                        }
                    });
                    var H, O = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
                    (k.fn.init = function(e, t, n) {
                        var r, i;
                        if (!e) return this;
                        if (n = n || H, "string" == typeof e) {
                            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : O.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                            if (r[1]) {
                                if (t = t instanceof k ? t[0] : t, k.merge(this, k.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : x, !0)), L.test(r[1]) && k.isPlainObject(t))
                                    for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                                return this
                            }
                            return (i = x.getElementById(r[2])) && (this[0] = i, this.length = 1), this
                        }
                        return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(k) : k.makeArray(e, this)
                    }).prototype = k.fn, H = k(x);
                    var P = /^(?:parents|prev(?:Until|All))/,
                        _ = {
                            children: !0,
                            contents: !0,
                            next: !0,
                            prev: !0
                        };

                    function R(e, t) {
                        for (;
                            (e = e[t]) && 1 !== e.nodeType;);
                        return e
                    }
                    k.fn.extend({
                        has: function(e) {
                            var t = k(e, this),
                                n = t.length;
                            return this.filter((function() {
                                for (var e = 0; e < n; e++)
                                    if (k.contains(this, t[e])) return !0
                            }))
                        },
                        closest: function(e, t) {
                            var n, r = 0,
                                i = this.length,
                                o = [],
                                a = "string" != typeof e && k(e);
                            if (!D.test(e))
                                for (; r < i; r++)
                                    for (n = this[r]; n && n !== t; n = n.parentNode)
                                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && k.find.matchesSelector(n, e))) {
                                            o.push(n);
                                            break
                                        }
                            return this.pushStack(o.length > 1 ? k.uniqueSort(o) : o)
                        },
                        index: function(e) {
                            return e ? "string" == typeof e ? c.call(k(e), this[0]) : c.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                        },
                        add: function(e, t) {
                            return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))))
                        },
                        addBack: function(e) {
                            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                        }
                    }), k.each({
                        parent: function(e) {
                            var t = e.parentNode;
                            return t && 11 !== t.nodeType ? t : null
                        },
                        parents: function(e) {
                            return A(e, "parentNode")
                        },
                        parentsUntil: function(e, t, n) {
                            return A(e, "parentNode", n)
                        },
                        next: function(e) {
                            return R(e, "nextSibling")
                        },
                        prev: function(e) {
                            return R(e, "previousSibling")
                        },
                        nextAll: function(e) {
                            return A(e, "nextSibling")
                        },
                        prevAll: function(e) {
                            return A(e, "previousSibling")
                        },
                        nextUntil: function(e, t, n) {
                            return A(e, "nextSibling", n)
                        },
                        prevUntil: function(e, t, n) {
                            return A(e, "previousSibling", n)
                        },
                        siblings: function(e) {
                            return N((e.parentNode || {}).firstChild, e)
                        },
                        children: function(e) {
                            return N(e.firstChild)
                        },
                        contents: function(e) {
                            return null != e.contentDocument && a(e.contentDocument) ? e.contentDocument : (j(e, "template") && (e = e.content || e), k.merge([], e.childNodes))
                        }
                    }, (function(e, t) {
                        k.fn[e] = function(n, r) {
                            var i = k.map(this, t, n);
                            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = k.filter(r, i)), this.length > 1 && (_[e] || k.uniqueSort(i), P.test(e) && i.reverse()), this.pushStack(i)
                        }
                    }));
                    var F = /[^\x20\t\r\n\f]+/g;

                    function M(e) {
                        return e
                    }

                    function I(e) {
                        throw e
                    }

                    function $(e, t, n, r) {
                        var i;
                        try {
                            e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
                        } catch (e) {
                            n.apply(void 0, [e])
                        }
                    }
                    k.Callbacks = function(e) {
                        e = "string" == typeof e ? function(e) {
                            var t = {};
                            return k.each(e.match(F) || [], (function(e, n) {
                                t[n] = !0
                            })), t
                        }(e) : k.extend({}, e);
                        var t, n, r, i, o = [],
                            a = [],
                            s = -1,
                            u = function() {
                                for (i = i || e.once, r = t = !0; a.length; s = -1)
                                    for (n = a.shift(); ++s < o.length;) !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
                                e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
                            },
                            l = {
                                add: function() {
                                    return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                                        k.each(n, (function(n, r) {
                                            m(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== T(r) && t(r)
                                        }))
                                    }(arguments), n && !t && u()), this
                                },
                                remove: function() {
                                    return k.each(arguments, (function(e, t) {
                                        for (var n;
                                            (n = k.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= s && s--
                                    })), this
                                },
                                has: function(e) {
                                    return e ? k.inArray(e, o) > -1 : o.length > 0
                                },
                                empty: function() {
                                    return o && (o = []), this
                                },
                                disable: function() {
                                    return i = a = [], o = n = "", this
                                },
                                disabled: function() {
                                    return !o
                                },
                                lock: function() {
                                    return i = a = [], n || t || (o = n = ""), this
                                },
                                locked: function() {
                                    return !!i
                                },
                                fireWith: function(e, n) {
                                    return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this
                                },
                                fire: function() {
                                    return l.fireWith(this, arguments), this
                                },
                                fired: function() {
                                    return !!r
                                }
                            };
                        return l
                    }, k.extend({
                        Deferred: function(e) {
                            var t = [
                                    ["notify", "progress", k.Callbacks("memory"), k.Callbacks("memory"), 2],
                                    ["resolve", "done", k.Callbacks("once memory"), k.Callbacks("once memory"), 0, "resolved"],
                                    ["reject", "fail", k.Callbacks("once memory"), k.Callbacks("once memory"), 1, "rejected"]
                                ],
                                n = "pending",
                                i = {
                                    state: function() {
                                        return n
                                    },
                                    always: function() {
                                        return o.done(arguments).fail(arguments), this
                                    },
                                    catch: function(e) {
                                        return i.then(null, e)
                                    },
                                    pipe: function() {
                                        var e = arguments;
                                        return k.Deferred((function(n) {
                                            k.each(t, (function(t, r) {
                                                var i = m(e[r[4]]) && e[r[4]];
                                                o[r[1]]((function() {
                                                    var e = i && i.apply(this, arguments);
                                                    e && m(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this, i ? [e] : arguments)
                                                }))
                                            })), e = null
                                        })).promise()
                                    },
                                    then: function(e, n, i) {
                                        var o = 0;

                                        function a(e, t, n, i) {
                                            return function() {
                                                var s = this,
                                                    u = arguments,
                                                    l = function() {
                                                        var r, l;
                                                        if (!(e < o)) {
                                                            if ((r = n.apply(s, u)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                                            l = r && ("object" == typeof r || "function" == typeof r) && r.then, m(l) ? i ? l.call(r, a(o, t, M, i), a(o, t, I, i)) : (o++, l.call(r, a(o, t, M, i), a(o, t, I, i), a(o, t, M, t.notifyWith))) : (n !== M && (s = void 0, u = [r]), (i || t.resolveWith)(s, u))
                                                        }
                                                    },
                                                    c = i ? l : function() {
                                                        try {
                                                            l()
                                                        } catch (r) {
                                                            k.Deferred.exceptionHook && k.Deferred.exceptionHook(r, c.stackTrace), e + 1 >= o && (n !== I && (s = void 0, u = [r]), t.rejectWith(s, u))
                                                        }
                                                    };
                                                e ? c() : (k.Deferred.getStackHook && (c.stackTrace = k.Deferred.getStackHook()), r.setTimeout(c))
                                            }
                                        }
                                        return k.Deferred((function(r) {
                                            t[0][3].add(a(0, r, m(i) ? i : M, r.notifyWith)), t[1][3].add(a(0, r, m(e) ? e : M)), t[2][3].add(a(0, r, m(n) ? n : I))
                                        })).promise()
                                    },
                                    promise: function(e) {
                                        return null != e ? k.extend(e, i) : i
                                    }
                                },
                                o = {};
                            return k.each(t, (function(e, r) {
                                var a = r[2],
                                    s = r[5];
                                i[r[1]] = a.add, s && a.add((function() {
                                    n = s
                                }), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), a.add(r[3].fire), o[r[0]] = function() {
                                    return o[r[0] + "With"](this === o ? void 0 : this, arguments), this
                                }, o[r[0] + "With"] = a.fireWith
                            })), i.promise(o), e && e.call(o, o), o
                        },
                        when: function(e) {
                            var t = arguments.length,
                                n = t,
                                r = Array(n),
                                i = s.call(arguments),
                                o = k.Deferred(),
                                a = function(e) {
                                    return function(n) {
                                        r[e] = this, i[e] = arguments.length > 1 ? s.call(arguments) : n, --t || o.resolveWith(r, i)
                                    }
                                };
                            if (t <= 1 && ($(e, o.done(a(n)).resolve, o.reject, !t), "pending" === o.state() || m(i[n] && i[n].then))) return o.then();
                            for (; n--;) $(i[n], a(n), o.reject);
                            return o.promise()
                        }
                    });
                    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                    k.Deferred.exceptionHook = function(e, t) {
                        r.console && r.console.warn && e && W.test(e.name) && r.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
                    }, k.readyException = function(e) {
                        r.setTimeout((function() {
                            throw e
                        }))
                    };
                    var B = k.Deferred();

                    function z() {
                        x.removeEventListener("DOMContentLoaded", z), r.removeEventListener("load", z), k.ready()
                    }
                    k.fn.ready = function(e) {
                        return B.then(e).catch((function(e) {
                            k.readyException(e)
                        })), this
                    }, k.extend({
                        isReady: !1,
                        readyWait: 1,
                        ready: function(e) {
                            (!0 === e ? --k.readyWait : k.isReady) || (k.isReady = !0, !0 !== e && --k.readyWait > 0 || B.resolveWith(x, [k]))
                        }
                    }), k.ready.then = B.then, "complete" === x.readyState || "loading" !== x.readyState && !x.documentElement.doScroll ? r.setTimeout(k.ready) : (x.addEventListener("DOMContentLoaded", z), r.addEventListener("load", z));
                    var U = function(e, t, n, r, i, o, a) {
                            var s = 0,
                                u = e.length,
                                l = null == n;
                            if ("object" === T(n))
                                for (s in i = !0, n) U(e, t, s, n[s], !0, o, a);
                            else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                                    return l.call(k(e), n)
                                })), t))
                                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
                        },
                        X = /^-ms-/,
                        V = /-([a-z])/g;

                    function G(e, t) {
                        return t.toUpperCase()
                    }

                    function Y(e) {
                        return e.replace(X, "ms-").replace(V, G)
                    }
                    var Q = function(e) {
                        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                    };

                    function J() {
                        this.expando = k.expando + J.uid++
                    }
                    J.uid = 1, J.prototype = {
                        cache: function(e) {
                            var t = e[this.expando];
                            return t || (t = {}, Q(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                                value: t,
                                configurable: !0
                            }))), t
                        },
                        set: function(e, t, n) {
                            var r, i = this.cache(e);
                            if ("string" == typeof t) i[Y(t)] = n;
                            else
                                for (r in t) i[Y(r)] = t[r];
                            return i
                        },
                        get: function(e, t) {
                            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][Y(t)]
                        },
                        access: function(e, t, n) {
                            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
                        },
                        remove: function(e, t) {
                            var n, r = e[this.expando];
                            if (void 0 !== r) {
                                if (void 0 !== t) {
                                    n = (t = Array.isArray(t) ? t.map(Y) : (t = Y(t)) in r ? [t] : t.match(F) || []).length;
                                    for (; n--;) delete r[t[n]]
                                }(void 0 === t || k.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                            }
                        },
                        hasData: function(e) {
                            var t = e[this.expando];
                            return void 0 !== t && !k.isEmptyObject(t)
                        }
                    };
                    var K = new J,
                        Z = new J,
                        ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                        te = /[A-Z]/g;

                    function ne(e, t, n) {
                        var r;
                        if (void 0 === n && 1 === e.nodeType)
                            if (r = "data-" + t.replace(te, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                                try {
                                    n = function(e) {
                                        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ee.test(e) ? JSON.parse(e) : e)
                                    }(n)
                                } catch (e) {}
                                Z.set(e, t, n)
                            } else n = void 0;
                        return n
                    }
                    k.extend({
                        hasData: function(e) {
                            return Z.hasData(e) || K.hasData(e)
                        },
                        data: function(e, t, n) {
                            return Z.access(e, t, n)
                        },
                        removeData: function(e, t) {
                            Z.remove(e, t)
                        },
                        _data: function(e, t, n) {
                            return K.access(e, t, n)
                        },
                        _removeData: function(e, t) {
                            K.remove(e, t)
                        }
                    }), k.fn.extend({
                        data: function(e, t) {
                            var n, r, i, o = this[0],
                                a = o && o.attributes;
                            if (void 0 === e) {
                                if (this.length && (i = Z.get(o), 1 === o.nodeType && !K.get(o, "hasDataAttrs"))) {
                                    for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = Y(r.slice(5)), ne(o, r, i[r]));
                                    K.set(o, "hasDataAttrs", !0)
                                }
                                return i
                            }
                            return "object" == typeof e ? this.each((function() {
                                Z.set(this, e)
                            })) : U(this, (function(t) {
                                var n;
                                if (o && void 0 === t) return void 0 !== (n = Z.get(o, e)) || void 0 !== (n = ne(o, e)) ? n : void 0;
                                this.each((function() {
                                    Z.set(this, e, t)
                                }))
                            }), null, t, arguments.length > 1, null, !0)
                        },
                        removeData: function(e) {
                            return this.each((function() {
                                Z.remove(this, e)
                            }))
                        }
                    }), k.extend({
                        queue: function(e, t, n) {
                            var r;
                            if (e) return t = (t || "fx") + "queue", r = K.get(e, t), n && (!r || Array.isArray(n) ? r = K.access(e, t, k.makeArray(n)) : r.push(n)), r || []
                        },
                        dequeue: function(e, t) {
                            t = t || "fx";
                            var n = k.queue(e, t),
                                r = n.length,
                                i = n.shift(),
                                o = k._queueHooks(e, t);
                            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, (function() {
                                k.dequeue(e, t)
                            }), o)), !r && o && o.empty.fire()
                        },
                        _queueHooks: function(e, t) {
                            var n = t + "queueHooks";
                            return K.get(e, n) || K.access(e, n, {
                                empty: k.Callbacks("once memory").add((function() {
                                    K.remove(e, [t + "queue", n])
                                }))
                            })
                        }
                    }), k.fn.extend({
                        queue: function(e, t) {
                            var n = 2;
                            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? k.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                                var n = k.queue(this, e, t);
                                k._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && k.dequeue(this, e)
                            }))
                        },
                        dequeue: function(e) {
                            return this.each((function() {
                                k.dequeue(this, e)
                            }))
                        },
                        clearQueue: function(e) {
                            return this.queue(e || "fx", [])
                        },
                        promise: function(e, t) {
                            var n, r = 1,
                                i = k.Deferred(),
                                o = this,
                                a = this.length,
                                s = function() {
                                    --r || i.resolveWith(o, [o])
                                };
                            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = K.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
                            return s(), i.promise(t)
                        }
                    });
                    var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                        ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
                        oe = ["Top", "Right", "Bottom", "Left"],
                        ae = x.documentElement,
                        se = function(e) {
                            return k.contains(e.ownerDocument, e)
                        },
                        ue = {
                            composed: !0
                        };
                    ae.getRootNode && (se = function(e) {
                        return k.contains(e.ownerDocument, e) || e.getRootNode(ue) === e.ownerDocument
                    });
                    var le = function(e, t) {
                        return "none" === (e = t || e).style.display || "" === e.style.display && se(e) && "none" === k.css(e, "display")
                    };

                    function ce(e, t, n, r) {
                        var i, o, a = 20,
                            s = r ? function() {
                                return r.cur()
                            } : function() {
                                return k.css(e, t, "")
                            },
                            u = s(),
                            l = n && n[3] || (k.cssNumber[t] ? "" : "px"),
                            c = e.nodeType && (k.cssNumber[t] || "px" !== l && +u) && ie.exec(k.css(e, t));
                        if (c && c[3] !== l) {
                            for (u /= 2, l = l || c[3], c = +u || 1; a--;) k.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
                            c *= 2, k.style(e, t, c + l), n = n || []
                        }
                        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
                    }
                    var fe = {};

                    function de(e) {
                        var t, n = e.ownerDocument,
                            r = e.nodeName,
                            i = fe[r];
                        return i || (t = n.body.appendChild(n.createElement(r)), i = k.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), fe[r] = i, i)
                    }

                    function pe(e, t) {
                        for (var n, r, i = [], o = 0, a = e.length; o < a; o++)(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = K.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && le(r) && (i[o] = de(r))) : "none" !== n && (i[o] = "none", K.set(r, "display", n)));
                        for (o = 0; o < a; o++) null != i[o] && (e[o].style.display = i[o]);
                        return e
                    }
                    k.fn.extend({
                        show: function() {
                            return pe(this, !0)
                        },
                        hide: function() {
                            return pe(this)
                        },
                        toggle: function(e) {
                            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                                le(this) ? k(this).show() : k(this).hide()
                            }))
                        }
                    });
                    var he, ge, ve = /^(?:checkbox|radio)$/i,
                        me = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                        ye = /^$|^module$|\/(?:java|ecma)script/i;
                    he = x.createDocumentFragment().appendChild(x.createElement("div")), (ge = x.createElement("input")).setAttribute("type", "radio"), ge.setAttribute("checked", "checked"), ge.setAttribute("name", "t"), he.appendChild(ge), v.checkClone = he.cloneNode(!0).cloneNode(!0).lastChild.checked, he.innerHTML = "<textarea>x</textarea>", v.noCloneChecked = !!he.cloneNode(!0).lastChild.defaultValue, he.innerHTML = "<option></option>", v.option = !!he.lastChild;
                    var xe = {
                        thead: [1, "<table>", "</table>"],
                        col: [2, "<table><colgroup>", "</colgroup></table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        _default: [0, "", ""]
                    };

                    function be(e, t) {
                        var n;
                        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && j(e, t) ? k.merge([e], n) : n
                    }

                    function we(e, t) {
                        for (var n = 0, r = e.length; n < r; n++) K.set(e[n], "globalEval", !t || K.get(t[n], "globalEval"))
                    }
                    xe.tbody = xe.tfoot = xe.colgroup = xe.caption = xe.thead, xe.th = xe.td, v.option || (xe.optgroup = xe.option = [1, "<select multiple='multiple'>", "</select>"]);
                    var Te = /<|&#?\w+;/;

                    function Ce(e, t, n, r, i) {
                        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), d = [], p = 0, h = e.length; p < h; p++)
                            if ((o = e[p]) || 0 === o)
                                if ("object" === T(o)) k.merge(d, o.nodeType ? [o] : o);
                                else if (Te.test(o)) {
                            for (a = a || f.appendChild(t.createElement("div")), s = (me.exec(o) || ["", ""])[1].toLowerCase(), u = xe[s] || xe._default, a.innerHTML = u[1] + k.htmlPrefilter(o) + u[2], c = u[0]; c--;) a = a.lastChild;
                            k.merge(d, a.childNodes), (a = f.firstChild).textContent = ""
                        } else d.push(t.createTextNode(o));
                        for (f.textContent = "", p = 0; o = d[p++];)
                            if (r && k.inArray(o, r) > -1) i && i.push(o);
                            else if (l = se(o), a = be(f.appendChild(o), "script"), l && we(a), n)
                            for (c = 0; o = a[c++];) ye.test(o.type || "") && n.push(o);
                        return f
                    }
                    var ke = /^([^.]*)(?:\.(.+)|)/;

                    function Ee() {
                        return !0
                    }

                    function Se() {
                        return !1
                    }

                    function Ae(e, t) {
                        return e === function() {
                            try {
                                return x.activeElement
                            } catch (e) {}
                        }() == ("focus" === t)
                    }

                    function Ne(e, t, n, r, i, o) {
                        var a, s;
                        if ("object" == typeof t) {
                            for (s in "string" != typeof n && (r = r || n, n = void 0), t) Ne(e, s, n, r, t[s], o);
                            return e
                        }
                        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Se;
                        else if (!i) return e;
                        return 1 === o && (a = i, i = function(e) {
                            return k().off(e), a.apply(this, arguments)
                        }, i.guid = a.guid || (a.guid = k.guid++)), e.each((function() {
                            k.event.add(this, t, i, r, n)
                        }))
                    }

                    function De(e, t, n) {
                        n ? (K.set(e, t, !1), k.event.add(e, t, {
                            namespace: !1,
                            handler: function(e) {
                                var r, i, o = K.get(this, t);
                                if (1 & e.isTrigger && this[t]) {
                                    if (o.length)(k.event.special[t] || {}).delegateType && e.stopPropagation();
                                    else if (o = s.call(arguments), K.set(this, t, o), r = n(this, t), this[t](), o !== (i = K.get(this, t)) || r ? K.set(this, t, !1) : i = {}, o !== i) return e.stopImmediatePropagation(), e.preventDefault(), i && i.value
                                } else o.length && (K.set(this, t, {
                                    value: k.event.trigger(k.extend(o[0], k.Event.prototype), o.slice(1), this)
                                }), e.stopImmediatePropagation())
                            }
                        })) : void 0 === K.get(e, t) && k.event.add(e, t, Ee)
                    }
                    k.event = {
                        global: {},
                        add: function(e, t, n, r, i) {
                            var o, a, s, u, l, c, f, d, p, h, g, v = K.get(e);
                            if (Q(e))
                                for (n.handler && (n = (o = n).handler, i = o.selector), i && k.find.matchesSelector(ae, i), n.guid || (n.guid = k.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function(t) {
                                        return void 0 !== k && k.event.triggered !== t.type ? k.event.dispatch.apply(e, arguments) : void 0
                                    }), l = (t = (t || "").match(F) || [""]).length; l--;) p = g = (s = ke.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p && (f = k.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = k.event.special[p] || {}, c = k.extend({
                                    type: p,
                                    origType: g,
                                    data: r,
                                    handler: n,
                                    guid: n.guid,
                                    selector: i,
                                    needsContext: i && k.expr.match.needsContext.test(i),
                                    namespace: h.join(".")
                                }, o), (d = u[p]) || ((d = u[p] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(p, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, c) : d.push(c), k.event.global[p] = !0)
                        },
                        remove: function(e, t, n, r, i) {
                            var o, a, s, u, l, c, f, d, p, h, g, v = K.hasData(e) && K.get(e);
                            if (v && (u = v.events)) {
                                for (l = (t = (t || "").match(F) || [""]).length; l--;)
                                    if (p = g = (s = ke.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                                        for (f = k.event.special[p] || {}, d = u[p = (r ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) c = d[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, f.remove && f.remove.call(e, c));
                                        a && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || k.removeEvent(e, p, v.handle), delete u[p])
                                    } else
                                        for (p in u) k.event.remove(e, p + t[l], n, r, !0);
                                k.isEmptyObject(u) && K.remove(e, "handle events")
                            }
                        },
                        dispatch: function(e) {
                            var t, n, r, i, o, a, s = new Array(arguments.length),
                                u = k.event.fix(e),
                                l = (K.get(this, "events") || Object.create(null))[u.type] || [],
                                c = k.event.special[u.type] || {};
                            for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
                            if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                                for (a = k.event.handlers.call(this, u, l), t = 0;
                                    (i = a[t++]) && !u.isPropagationStopped();)
                                    for (u.currentTarget = i.elem, n = 0;
                                        (o = i.handlers[n++]) && !u.isImmediatePropagationStopped();) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((k.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
                                return c.postDispatch && c.postDispatch.call(this, u), u.result
                            }
                        },
                        handlers: function(e, t) {
                            var n, r, i, o, a, s = [],
                                u = t.delegateCount,
                                l = e.target;
                            if (u && l.nodeType && !("click" === e.type && e.button >= 1))
                                for (; l !== this; l = l.parentNode || this)
                                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                                        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? k(i, this).index(l) > -1 : k.find(i, this, null, [l]).length), a[i] && o.push(r);
                                        o.length && s.push({
                                            elem: l,
                                            handlers: o
                                        })
                                    }
                            return l = this, u < t.length && s.push({
                                elem: l,
                                handlers: t.slice(u)
                            }), s
                        },
                        addProp: function(e, t) {
                            Object.defineProperty(k.Event.prototype, e, {
                                enumerable: !0,
                                configurable: !0,
                                get: m(t) ? function() {
                                    if (this.originalEvent) return t(this.originalEvent)
                                } : function() {
                                    if (this.originalEvent) return this.originalEvent[e]
                                },
                                set: function(t) {
                                    Object.defineProperty(this, e, {
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: t
                                    })
                                }
                            })
                        },
                        fix: function(e) {
                            return e[k.expando] ? e : new k.Event(e)
                        },
                        special: {
                            load: {
                                noBubble: !0
                            },
                            click: {
                                setup: function(e) {
                                    var t = this || e;
                                    return ve.test(t.type) && t.click && j(t, "input") && De(t, "click", Ee), !1
                                },
                                trigger: function(e) {
                                    var t = this || e;
                                    return ve.test(t.type) && t.click && j(t, "input") && De(t, "click"), !0
                                },
                                _default: function(e) {
                                    var t = e.target;
                                    return ve.test(t.type) && t.click && j(t, "input") && K.get(t, "click") || j(t, "a")
                                }
                            },
                            beforeunload: {
                                postDispatch: function(e) {
                                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                                }
                            }
                        }
                    }, k.removeEvent = function(e, t, n) {
                        e.removeEventListener && e.removeEventListener(t, n)
                    }, k.Event = function(e, t) {
                        if (!(this instanceof k.Event)) return new k.Event(e, t);
                        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : Se, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && k.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[k.expando] = !0
                    }, k.Event.prototype = {
                        constructor: k.Event,
                        isDefaultPrevented: Se,
                        isPropagationStopped: Se,
                        isImmediatePropagationStopped: Se,
                        isSimulated: !1,
                        preventDefault: function() {
                            var e = this.originalEvent;
                            this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault()
                        },
                        stopPropagation: function() {
                            var e = this.originalEvent;
                            this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation()
                        },
                        stopImmediatePropagation: function() {
                            var e = this.originalEvent;
                            this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                        }
                    }, k.each({
                        altKey: !0,
                        bubbles: !0,
                        cancelable: !0,
                        changedTouches: !0,
                        ctrlKey: !0,
                        detail: !0,
                        eventPhase: !0,
                        metaKey: !0,
                        pageX: !0,
                        pageY: !0,
                        shiftKey: !0,
                        view: !0,
                        char: !0,
                        code: !0,
                        charCode: !0,
                        key: !0,
                        keyCode: !0,
                        button: !0,
                        buttons: !0,
                        clientX: !0,
                        clientY: !0,
                        offsetX: !0,
                        offsetY: !0,
                        pointerId: !0,
                        pointerType: !0,
                        screenX: !0,
                        screenY: !0,
                        targetTouches: !0,
                        toElement: !0,
                        touches: !0,
                        which: !0
                    }, k.event.addProp), k.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, (function(e, t) {
                        k.event.special[e] = {
                            setup: function() {
                                return De(this, e, Ae), !1
                            },
                            trigger: function() {
                                return De(this, e), !0
                            },
                            _default: function() {
                                return !0
                            },
                            delegateType: t
                        }
                    })), k.each({
                        mouseenter: "mouseover",
                        mouseleave: "mouseout",
                        pointerenter: "pointerover",
                        pointerleave: "pointerout"
                    }, (function(e, t) {
                        k.event.special[e] = {
                            delegateType: t,
                            bindType: t,
                            handle: function(e) {
                                var n, r = this,
                                    i = e.relatedTarget,
                                    o = e.handleObj;
                                return i && (i === r || k.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                            }
                        }
                    })), k.fn.extend({
                        on: function(e, t, n, r) {
                            return Ne(this, e, t, n, r)
                        },
                        one: function(e, t, n, r) {
                            return Ne(this, e, t, n, r, 1)
                        },
                        off: function(e, t, n) {
                            var r, i;
                            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, k(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                            if ("object" == typeof e) {
                                for (i in e) this.off(i, t, e[i]);
                                return this
                            }
                            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Se), this.each((function() {
                                k.event.remove(this, e, n, t)
                            }))
                        }
                    });
                    var je = /<script|<style|<link/i,
                        Le = /checked\s*(?:[^=]|=\s*.checked.)/i,
                        qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                    function He(e, t) {
                        return j(e, "table") && j(11 !== t.nodeType ? t : t.firstChild, "tr") && k(e).children("tbody")[0] || e
                    }

                    function Oe(e) {
                        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
                    }

                    function Pe(e) {
                        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
                    }

                    function _e(e, t) {
                        var n, r, i, o, a, s;
                        if (1 === t.nodeType) {
                            if (K.hasData(e) && (s = K.get(e).events))
                                for (i in K.remove(t, "handle events"), s)
                                    for (n = 0, r = s[i].length; n < r; n++) k.event.add(t, i, s[i][n]);
                            Z.hasData(e) && (o = Z.access(e), a = k.extend({}, o), Z.set(t, a))
                        }
                    }

                    function Re(e, t) {
                        var n = t.nodeName.toLowerCase();
                        "input" === n && ve.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
                    }

                    function Fe(e, t, n, r) {
                        t = u(t);
                        var i, o, a, s, l, c, f = 0,
                            d = e.length,
                            p = d - 1,
                            h = t[0],
                            g = m(h);
                        if (g || d > 1 && "string" == typeof h && !v.checkClone && Le.test(h)) return e.each((function(i) {
                            var o = e.eq(i);
                            g && (t[0] = h.call(this, i, o.html())), Fe(o, t, n, r)
                        }));
                        if (d && (o = (i = Ce(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
                            for (s = (a = k.map(be(i, "script"), Oe)).length; f < d; f++) l = i, f !== p && (l = k.clone(l, !0, !0), s && k.merge(a, be(l, "script"))), n.call(e[f], l, f);
                            if (s)
                                for (c = a[a.length - 1].ownerDocument, k.map(a, Pe), f = 0; f < s; f++) l = a[f], ye.test(l.type || "") && !K.access(l, "globalEval") && k.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? k._evalUrl && !l.noModule && k._evalUrl(l.src, {
                                    nonce: l.nonce || l.getAttribute("nonce")
                                }, c) : w(l.textContent.replace(qe, ""), l, c))
                        }
                        return e
                    }

                    function Me(e, t, n) {
                        for (var r, i = t ? k.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || k.cleanData(be(r)), r.parentNode && (n && se(r) && we(be(r, "script")), r.parentNode.removeChild(r));
                        return e
                    }
                    k.extend({
                        htmlPrefilter: function(e) {
                            return e
                        },
                        clone: function(e, t, n) {
                            var r, i, o, a, s = e.cloneNode(!0),
                                u = se(e);
                            if (!(v.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || k.isXMLDoc(e)))
                                for (a = be(s), r = 0, i = (o = be(e)).length; r < i; r++) Re(o[r], a[r]);
                            if (t)
                                if (n)
                                    for (o = o || be(e), a = a || be(s), r = 0, i = o.length; r < i; r++) _e(o[r], a[r]);
                                else _e(e, s);
                            return (a = be(s, "script")).length > 0 && we(a, !u && be(e, "script")), s
                        },
                        cleanData: function(e) {
                            for (var t, n, r, i = k.event.special, o = 0; void 0 !== (n = e[o]); o++)
                                if (Q(n)) {
                                    if (t = n[K.expando]) {
                                        if (t.events)
                                            for (r in t.events) i[r] ? k.event.remove(n, r) : k.removeEvent(n, r, t.handle);
                                        n[K.expando] = void 0
                                    }
                                    n[Z.expando] && (n[Z.expando] = void 0)
                                }
                        }
                    }), k.fn.extend({
                        detach: function(e) {
                            return Me(this, e, !0)
                        },
                        remove: function(e) {
                            return Me(this, e)
                        },
                        text: function(e) {
                            return U(this, (function(e) {
                                return void 0 === e ? k.text(this) : this.empty().each((function() {
                                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                                }))
                            }), null, e, arguments.length)
                        },
                        append: function() {
                            return Fe(this, arguments, (function(e) {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || He(this, e).appendChild(e)
                            }))
                        },
                        prepend: function() {
                            return Fe(this, arguments, (function(e) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var t = He(this, e);
                                    t.insertBefore(e, t.firstChild)
                                }
                            }))
                        },
                        before: function() {
                            return Fe(this, arguments, (function(e) {
                                this.parentNode && this.parentNode.insertBefore(e, this)
                            }))
                        },
                        after: function() {
                            return Fe(this, arguments, (function(e) {
                                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                            }))
                        },
                        empty: function() {
                            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (k.cleanData(be(e, !1)), e.textContent = "");
                            return this
                        },
                        clone: function(e, t) {
                            return e = null != e && e, t = null == t ? e : t, this.map((function() {
                                return k.clone(this, e, t)
                            }))
                        },
                        html: function(e) {
                            return U(this, (function(e) {
                                var t = this[0] || {},
                                    n = 0,
                                    r = this.length;
                                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                                if ("string" == typeof e && !je.test(e) && !xe[(me.exec(e) || ["", ""])[1].toLowerCase()]) {
                                    e = k.htmlPrefilter(e);
                                    try {
                                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (k.cleanData(be(t, !1)), t.innerHTML = e);
                                        t = 0
                                    } catch (e) {}
                                }
                                t && this.empty().append(e)
                            }), null, e, arguments.length)
                        },
                        replaceWith: function() {
                            var e = [];
                            return Fe(this, arguments, (function(t) {
                                var n = this.parentNode;
                                k.inArray(this, e) < 0 && (k.cleanData(be(this)), n && n.replaceChild(t, this))
                            }), e)
                        }
                    }), k.each({
                        appendTo: "append",
                        prependTo: "prepend",
                        insertBefore: "before",
                        insertAfter: "after",
                        replaceAll: "replaceWith"
                    }, (function(e, t) {
                        k.fn[e] = function(e) {
                            for (var n, r = [], i = k(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), k(i[a])[t](n), l.apply(r, n.get());
                            return this.pushStack(r)
                        }
                    }));
                    var Ie = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
                        $e = function(e) {
                            var t = e.ownerDocument.defaultView;
                            return t && t.opener || (t = r), t.getComputedStyle(e)
                        },
                        We = function(e, t, n) {
                            var r, i, o = {};
                            for (i in t) o[i] = e.style[i], e.style[i] = t[i];
                            for (i in r = n.call(e), t) e.style[i] = o[i];
                            return r
                        },
                        Be = new RegExp(oe.join("|"), "i");

                    function ze(e, t, n) {
                        var r, i, o, a, s = e.style;
                        return (n = n || $e(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || se(e) || (a = k.style(e, t)), !v.pixelBoxStyles() && Ie.test(a) && Be.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
                    }

                    function Ue(e, t) {
                        return {
                            get: function() {
                                if (!e()) return (this.get = t).apply(this, arguments);
                                delete this.get
                            }
                        }
                    }! function() {
                        function e() {
                            if (c) {
                                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ae.appendChild(l).appendChild(c);
                                var e = r.getComputedStyle(c);
                                n = "1%" !== e.top, u = 12 === t(e.marginLeft), c.style.right = "60%", a = 36 === t(e.right), i = 36 === t(e.width), c.style.position = "absolute", o = 12 === t(c.offsetWidth / 3), ae.removeChild(l), c = null
                            }
                        }

                        function t(e) {
                            return Math.round(parseFloat(e))
                        }
                        var n, i, o, a, s, u, l = x.createElement("div"),
                            c = x.createElement("div");
                        c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", v.clearCloneStyle = "content-box" === c.style.backgroundClip, k.extend(v, {
                            boxSizingReliable: function() {
                                return e(), i
                            },
                            pixelBoxStyles: function() {
                                return e(), a
                            },
                            pixelPosition: function() {
                                return e(), n
                            },
                            reliableMarginLeft: function() {
                                return e(), u
                            },
                            scrollboxSize: function() {
                                return e(), o
                            },
                            reliableTrDimensions: function() {
                                var e, t, n, i;
                                return null == s && (e = x.createElement("table"), t = x.createElement("tr"), n = x.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", ae.appendChild(e).appendChild(t).appendChild(n), i = r.getComputedStyle(t), s = parseInt(i.height, 10) + parseInt(i.borderTopWidth, 10) + parseInt(i.borderBottomWidth, 10) === t.offsetHeight, ae.removeChild(e)), s
                            }
                        }))
                    }();
                    var Xe = ["Webkit", "Moz", "ms"],
                        Ve = x.createElement("div").style,
                        Ge = {};

                    function Ye(e) {
                        var t = k.cssProps[e] || Ge[e];
                        return t || (e in Ve ? e : Ge[e] = function(e) {
                            for (var t = e[0].toUpperCase() + e.slice(1), n = Xe.length; n--;)
                                if ((e = Xe[n] + t) in Ve) return e
                        }(e) || e)
                    }
                    var Qe = /^(none|table(?!-c[ea]).+)/,
                        Je = /^--/,
                        Ke = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        Ze = {
                            letterSpacing: "0",
                            fontWeight: "400"
                        };

                    function et(e, t, n) {
                        var r = ie.exec(t);
                        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
                    }

                    function tt(e, t, n, r, i, o) {
                        var a = "width" === t ? 1 : 0,
                            s = 0,
                            u = 0;
                        if (n === (r ? "border" : "content")) return 0;
                        for (; a < 4; a += 2) "margin" === n && (u += k.css(e, n + oe[a], !0, i)), r ? ("content" === n && (u -= k.css(e, "padding" + oe[a], !0, i)), "margin" !== n && (u -= k.css(e, "border" + oe[a] + "Width", !0, i))) : (u += k.css(e, "padding" + oe[a], !0, i), "padding" !== n ? u += k.css(e, "border" + oe[a] + "Width", !0, i) : s += k.css(e, "border" + oe[a] + "Width", !0, i));
                        return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u
                    }

                    function nt(e, t, n) {
                        var r = $e(e),
                            i = (!v.boxSizingReliable() || n) && "border-box" === k.css(e, "boxSizing", !1, r),
                            o = i,
                            a = ze(e, t, r),
                            s = "offset" + t[0].toUpperCase() + t.slice(1);
                        if (Ie.test(a)) {
                            if (!n) return a;
                            a = "auto"
                        }
                        return (!v.boxSizingReliable() && i || !v.reliableTrDimensions() && j(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === k.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === k.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + tt(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
                    }

                    function rt(e, t, n, r, i) {
                        return new rt.prototype.init(e, t, n, r, i)
                    }
                    k.extend({
                        cssHooks: {
                            opacity: {
                                get: function(e, t) {
                                    if (t) {
                                        var n = ze(e, "opacity");
                                        return "" === n ? "1" : n
                                    }
                                }
                            }
                        },
                        cssNumber: {
                            animationIterationCount: !0,
                            columnCount: !0,
                            fillOpacity: !0,
                            flexGrow: !0,
                            flexShrink: !0,
                            fontWeight: !0,
                            gridArea: !0,
                            gridColumn: !0,
                            gridColumnEnd: !0,
                            gridColumnStart: !0,
                            gridRow: !0,
                            gridRowEnd: !0,
                            gridRowStart: !0,
                            lineHeight: !0,
                            opacity: !0,
                            order: !0,
                            orphans: !0,
                            widows: !0,
                            zIndex: !0,
                            zoom: !0
                        },
                        cssProps: {},
                        style: function(e, t, n, r) {
                            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                                var i, o, a, s = Y(t),
                                    u = Je.test(t),
                                    l = e.style;
                                if (u || (t = Ye(s)), a = k.cssHooks[t] || k.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                                "string" === (o = typeof n) && (i = ie.exec(n)) && i[1] && (n = ce(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (k.cssNumber[s] ? "" : "px")), v.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
                            }
                        },
                        css: function(e, t, n, r) {
                            var i, o, a, s = Y(t);
                            return Je.test(t) || (t = Ye(s)), (a = k.cssHooks[t] || k.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = ze(e, t, r)), "normal" === i && t in Ze && (i = Ze[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
                        }
                    }), k.each(["height", "width"], (function(e, t) {
                        k.cssHooks[t] = {
                            get: function(e, n, r) {
                                if (n) return !Qe.test(k.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? nt(e, t, r) : We(e, Ke, (function() {
                                    return nt(e, t, r)
                                }))
                            },
                            set: function(e, n, r) {
                                var i, o = $e(e),
                                    a = !v.scrollboxSize() && "absolute" === o.position,
                                    s = (a || r) && "border-box" === k.css(e, "boxSizing", !1, o),
                                    u = r ? tt(e, t, r, s, o) : 0;
                                return s && a && (u -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - tt(e, t, "border", !1, o) - .5)), u && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = k.css(e, t)), et(0, n, u)
                            }
                        }
                    })), k.cssHooks.marginLeft = Ue(v.reliableMarginLeft, (function(e, t) {
                        if (t) return (parseFloat(ze(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
                            marginLeft: 0
                        }, (function() {
                            return e.getBoundingClientRect().left
                        }))) + "px"
                    })), k.each({
                        margin: "",
                        padding: "",
                        border: "Width"
                    }, (function(e, t) {
                        k.cssHooks[e + t] = {
                            expand: function(n) {
                                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
                                return i
                            }
                        }, "margin" !== e && (k.cssHooks[e + t].set = et)
                    })), k.fn.extend({
                        css: function(e, t) {
                            return U(this, (function(e, t, n) {
                                var r, i, o = {},
                                    a = 0;
                                if (Array.isArray(t)) {
                                    for (r = $e(e), i = t.length; a < i; a++) o[t[a]] = k.css(e, t[a], !1, r);
                                    return o
                                }
                                return void 0 !== n ? k.style(e, t, n) : k.css(e, t)
                            }), e, t, arguments.length > 1)
                        }
                    }), k.Tween = rt, rt.prototype = {
                        constructor: rt,
                        init: function(e, t, n, r, i, o) {
                            this.elem = e, this.prop = n, this.easing = i || k.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (k.cssNumber[n] ? "" : "px")
                        },
                        cur: function() {
                            var e = rt.propHooks[this.prop];
                            return e && e.get ? e.get(this) : rt.propHooks._default.get(this)
                        },
                        run: function(e) {
                            var t, n = rt.propHooks[this.prop];
                            return this.options.duration ? this.pos = t = k.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rt.propHooks._default.set(this), this
                        }
                    }, rt.prototype.init.prototype = rt.prototype, rt.propHooks = {
                        _default: {
                            get: function(e) {
                                var t;
                                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = k.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                            },
                            set: function(e) {
                                k.fx.step[e.prop] ? k.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !k.cssHooks[e.prop] && null == e.elem.style[Ye(e.prop)] ? e.elem[e.prop] = e.now : k.style(e.elem, e.prop, e.now + e.unit)
                            }
                        }
                    }, rt.propHooks.scrollTop = rt.propHooks.scrollLeft = {
                        set: function(e) {
                            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                        }
                    }, k.easing = {
                        linear: function(e) {
                            return e
                        },
                        swing: function(e) {
                            return .5 - Math.cos(e * Math.PI) / 2
                        },
                        _default: "swing"
                    }, k.fx = rt.prototype.init, k.fx.step = {};
                    var it, ot, at = /^(?:toggle|show|hide)$/,
                        st = /queueHooks$/;

                    function ut() {
                        ot && (!1 === x.hidden && r.requestAnimationFrame ? r.requestAnimationFrame(ut) : r.setTimeout(ut, k.fx.interval), k.fx.tick())
                    }

                    function lt() {
                        return r.setTimeout((function() {
                            it = void 0
                        })), it = Date.now()
                    }

                    function ct(e, t) {
                        var n, r = 0,
                            i = {
                                height: e
                            };
                        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = oe[r])] = i["padding" + n] = e;
                        return t && (i.opacity = i.width = e), i
                    }

                    function ft(e, t, n) {
                        for (var r, i = (dt.tweeners[t] || []).concat(dt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
                            if (r = i[o].call(n, t, e)) return r
                    }

                    function dt(e, t, n) {
                        var r, i, o = 0,
                            a = dt.prefilters.length,
                            s = k.Deferred().always((function() {
                                delete u.elem
                            })),
                            u = function() {
                                if (i) return !1;
                                for (var t = it || lt(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) l.tweens[o].run(r);
                                return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1)
                            },
                            l = s.promise({
                                elem: e,
                                props: k.extend({}, t),
                                opts: k.extend(!0, {
                                    specialEasing: {},
                                    easing: k.easing._default
                                }, n),
                                originalProperties: t,
                                originalOptions: n,
                                startTime: it || lt(),
                                duration: n.duration,
                                tweens: [],
                                createTween: function(t, n) {
                                    var r = k.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                                    return l.tweens.push(r), r
                                },
                                stop: function(t) {
                                    var n = 0,
                                        r = t ? l.tweens.length : 0;
                                    if (i) return this;
                                    for (i = !0; n < r; n++) l.tweens[n].run(1);
                                    return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                                }
                            }),
                            c = l.props;
                        for (! function(e, t) {
                                var n, r, i, o, a;
                                for (n in e)
                                    if (i = t[r = Y(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = k.cssHooks[r]) && "expand" in a)
                                        for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
                                    else t[r] = i
                            }(c, l.opts.specialEasing); o < a; o++)
                            if (r = dt.prefilters[o].call(l, e, c, l.opts)) return m(r.stop) && (k._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
                        return k.map(c, ft, l), m(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), k.fx.timer(k.extend(u, {
                            elem: e,
                            anim: l,
                            queue: l.opts.queue
                        })), l
                    }
                    k.Animation = k.extend(dt, {
                            tweeners: {
                                "*": [function(e, t) {
                                    var n = this.createTween(e, t);
                                    return ce(n.elem, e, ie.exec(t), n), n
                                }]
                            },
                            tweener: function(e, t) {
                                m(e) ? (t = e, e = ["*"]) : e = e.match(F);
                                for (var n, r = 0, i = e.length; r < i; r++) n = e[r], dt.tweeners[n] = dt.tweeners[n] || [], dt.tweeners[n].unshift(t)
                            },
                            prefilters: [function(e, t, n) {
                                var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t,
                                    d = this,
                                    p = {},
                                    h = e.style,
                                    g = e.nodeType && le(e),
                                    v = K.get(e, "fxshow");
                                for (r in n.queue || (null == (a = k._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                                        a.unqueued || s()
                                    }), a.unqueued++, d.always((function() {
                                        d.always((function() {
                                            a.unqueued--, k.queue(e, "fx").length || a.empty.fire()
                                        }))
                                    }))), t)
                                    if (i = t[r], at.test(i)) {
                                        if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                                            if ("show" !== i || !v || void 0 === v[r]) continue;
                                            g = !0
                                        }
                                        p[r] = v && v[r] || k.style(e, r)
                                    }
                                if ((u = !k.isEmptyObject(t)) || !k.isEmptyObject(p))
                                    for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = K.get(e, "display")), "none" === (c = k.css(e, "display")) && (l ? c = l : (pe([e], !0), l = e.style.display || l, c = k.css(e, "display"), pe([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === k.css(e, "float") && (u || (d.done((function() {
                                            h.display = l
                                        })), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", d.always((function() {
                                            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                                        }))), u = !1, p) u || (v ? "hidden" in v && (g = v.hidden) : v = K.access(e, "fxshow", {
                                        display: l
                                    }), o && (v.hidden = !g), g && pe([e], !0), d.done((function() {
                                        for (r in g || pe([e]), K.remove(e, "fxshow"), p) k.style(e, r, p[r])
                                    }))), u = ft(g ? v[r] : 0, r, d), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0))
                            }],
                            prefilter: function(e, t) {
                                t ? dt.prefilters.unshift(e) : dt.prefilters.push(e)
                            }
                        }), k.speed = function(e, t, n) {
                            var r = e && "object" == typeof e ? k.extend({}, e) : {
                                complete: n || !n && t || m(e) && e,
                                duration: e,
                                easing: n && t || t && !m(t) && t
                            };
                            return k.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in k.fx.speeds ? r.duration = k.fx.speeds[r.duration] : r.duration = k.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                                m(r.old) && r.old.call(this), r.queue && k.dequeue(this, r.queue)
                            }, r
                        }, k.fn.extend({
                            fadeTo: function(e, t, n, r) {
                                return this.filter(le).css("opacity", 0).show().end().animate({
                                    opacity: t
                                }, e, n, r)
                            },
                            animate: function(e, t, n, r) {
                                var i = k.isEmptyObject(e),
                                    o = k.speed(t, n, r),
                                    a = function() {
                                        var t = dt(this, k.extend({}, e), o);
                                        (i || K.get(this, "finish")) && t.stop(!0)
                                    };
                                return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
                            },
                            stop: function(e, t, n) {
                                var r = function(e) {
                                    var t = e.stop;
                                    delete e.stop, t(n)
                                };
                                return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each((function() {
                                    var t = !0,
                                        i = null != e && e + "queueHooks",
                                        o = k.timers,
                                        a = K.get(this);
                                    if (i) a[i] && a[i].stop && r(a[i]);
                                    else
                                        for (i in a) a[i] && a[i].stop && st.test(i) && r(a[i]);
                                    for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                                    !t && n || k.dequeue(this, e)
                                }))
                            },
                            finish: function(e) {
                                return !1 !== e && (e = e || "fx"), this.each((function() {
                                    var t, n = K.get(this),
                                        r = n[e + "queue"],
                                        i = n[e + "queueHooks"],
                                        o = k.timers,
                                        a = r ? r.length : 0;
                                    for (n.finish = !0, k.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                                    for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                                    delete n.finish
                                }))
                            }
                        }), k.each(["toggle", "show", "hide"], (function(e, t) {
                            var n = k.fn[t];
                            k.fn[t] = function(e, r, i) {
                                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ct(t, !0), e, r, i)
                            }
                        })), k.each({
                            slideDown: ct("show"),
                            slideUp: ct("hide"),
                            slideToggle: ct("toggle"),
                            fadeIn: {
                                opacity: "show"
                            },
                            fadeOut: {
                                opacity: "hide"
                            },
                            fadeToggle: {
                                opacity: "toggle"
                            }
                        }, (function(e, t) {
                            k.fn[e] = function(e, n, r) {
                                return this.animate(t, e, n, r)
                            }
                        })), k.timers = [], k.fx.tick = function() {
                            var e, t = 0,
                                n = k.timers;
                            for (it = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
                            n.length || k.fx.stop(), it = void 0
                        }, k.fx.timer = function(e) {
                            k.timers.push(e), k.fx.start()
                        }, k.fx.interval = 13, k.fx.start = function() {
                            ot || (ot = !0, ut())
                        }, k.fx.stop = function() {
                            ot = null
                        }, k.fx.speeds = {
                            slow: 600,
                            fast: 200,
                            _default: 400
                        }, k.fn.delay = function(e, t) {
                            return e = k.fx && k.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, n) {
                                var i = r.setTimeout(t, e);
                                n.stop = function() {
                                    r.clearTimeout(i)
                                }
                            }))
                        },
                        function() {
                            var e = x.createElement("input"),
                                t = x.createElement("select").appendChild(x.createElement("option"));
                            e.type = "checkbox", v.checkOn = "" !== e.value, v.optSelected = t.selected, (e = x.createElement("input")).value = "t", e.type = "radio", v.radioValue = "t" === e.value
                        }();
                    var pt, ht = k.expr.attrHandle;
                    k.fn.extend({
                        attr: function(e, t) {
                            return U(this, k.attr, e, t, arguments.length > 1)
                        },
                        removeAttr: function(e) {
                            return this.each((function() {
                                k.removeAttr(this, e)
                            }))
                        }
                    }), k.extend({
                        attr: function(e, t, n) {
                            var r, i, o = e.nodeType;
                            if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? k.prop(e, t, n) : (1 === o && k.isXMLDoc(e) || (i = k.attrHooks[t.toLowerCase()] || (k.expr.match.bool.test(t) ? pt : void 0)), void 0 !== n ? null === n ? void k.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = k.find.attr(e, t)) ? void 0 : r)
                        },
                        attrHooks: {
                            type: {
                                set: function(e, t) {
                                    if (!v.radioValue && "radio" === t && j(e, "input")) {
                                        var n = e.value;
                                        return e.setAttribute("type", t), n && (e.value = n), t
                                    }
                                }
                            }
                        },
                        removeAttr: function(e, t) {
                            var n, r = 0,
                                i = t && t.match(F);
                            if (i && 1 === e.nodeType)
                                for (; n = i[r++];) e.removeAttribute(n)
                        }
                    }), pt = {
                        set: function(e, t, n) {
                            return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n
                        }
                    }, k.each(k.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                        var n = ht[t] || k.find.attr;
                        ht[t] = function(e, t, r) {
                            var i, o, a = t.toLowerCase();
                            return r || (o = ht[a], ht[a] = i, i = null != n(e, t, r) ? a : null, ht[a] = o), i
                        }
                    }));
                    var gt = /^(?:input|select|textarea|button)$/i,
                        vt = /^(?:a|area)$/i;

                    function mt(e) {
                        return (e.match(F) || []).join(" ")
                    }

                    function yt(e) {
                        return e.getAttribute && e.getAttribute("class") || ""
                    }

                    function xt(e) {
                        return Array.isArray(e) ? e : "string" == typeof e && e.match(F) || []
                    }
                    k.fn.extend({
                        prop: function(e, t) {
                            return U(this, k.prop, e, t, arguments.length > 1)
                        },
                        removeProp: function(e) {
                            return this.each((function() {
                                delete this[k.propFix[e] || e]
                            }))
                        }
                    }), k.extend({
                        prop: function(e, t, n) {
                            var r, i, o = e.nodeType;
                            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && k.isXMLDoc(e) || (t = k.propFix[t] || t, i = k.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
                        },
                        propHooks: {
                            tabIndex: {
                                get: function(e) {
                                    var t = k.find.attr(e, "tabindex");
                                    return t ? parseInt(t, 10) : gt.test(e.nodeName) || vt.test(e.nodeName) && e.href ? 0 : -1
                                }
                            }
                        },
                        propFix: {
                            for: "htmlFor",
                            class: "className"
                        }
                    }), v.optSelected || (k.propHooks.selected = {
                        get: function(e) {
                            var t = e.parentNode;
                            return t && t.parentNode && t.parentNode.selectedIndex, null
                        },
                        set: function(e) {
                            var t = e.parentNode;
                            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                        }
                    }), k.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
                        k.propFix[this.toLowerCase()] = this
                    })), k.fn.extend({
                        addClass: function(e) {
                            var t, n, r, i, o, a, s, u = 0;
                            if (m(e)) return this.each((function(t) {
                                k(this).addClass(e.call(this, t, yt(this)))
                            }));
                            if ((t = xt(e)).length)
                                for (; n = this[u++];)
                                    if (i = yt(n), r = 1 === n.nodeType && " " + mt(i) + " ") {
                                        for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                        i !== (s = mt(r)) && n.setAttribute("class", s)
                                    }
                            return this
                        },
                        removeClass: function(e) {
                            var t, n, r, i, o, a, s, u = 0;
                            if (m(e)) return this.each((function(t) {
                                k(this).removeClass(e.call(this, t, yt(this)))
                            }));
                            if (!arguments.length) return this.attr("class", "");
                            if ((t = xt(e)).length)
                                for (; n = this[u++];)
                                    if (i = yt(n), r = 1 === n.nodeType && " " + mt(i) + " ") {
                                        for (a = 0; o = t[a++];)
                                            for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                                        i !== (s = mt(r)) && n.setAttribute("class", s)
                                    }
                            return this
                        },
                        toggleClass: function(e, t) {
                            var n = typeof e,
                                r = "string" === n || Array.isArray(e);
                            return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : m(e) ? this.each((function(n) {
                                k(this).toggleClass(e.call(this, n, yt(this), t), t)
                            })) : this.each((function() {
                                var t, i, o, a;
                                if (r)
                                    for (i = 0, o = k(this), a = xt(e); t = a[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                                else void 0 !== e && "boolean" !== n || ((t = yt(this)) && K.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : K.get(this, "__className__") || ""))
                            }))
                        },
                        hasClass: function(e) {
                            var t, n, r = 0;
                            for (t = " " + e + " "; n = this[r++];)
                                if (1 === n.nodeType && (" " + mt(yt(n)) + " ").indexOf(t) > -1) return !0;
                            return !1
                        }
                    });
                    var bt = /\r/g;
                    k.fn.extend({
                        val: function(e) {
                            var t, n, r, i = this[0];
                            return arguments.length ? (r = m(e), this.each((function(n) {
                                var i;
                                1 === this.nodeType && (null == (i = r ? e.call(this, n, k(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = k.map(i, (function(e) {
                                    return null == e ? "" : e + ""
                                }))), (t = k.valHooks[this.type] || k.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                            }))) : i ? (t = k.valHooks[i.type] || k.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof(n = i.value) ? n.replace(bt, "") : null == n ? "" : n : void 0
                        }
                    }), k.extend({
                        valHooks: {
                            option: {
                                get: function(e) {
                                    var t = k.find.attr(e, "value");
                                    return null != t ? t : mt(k.text(e))
                                }
                            },
                            select: {
                                get: function(e) {
                                    var t, n, r, i = e.options,
                                        o = e.selectedIndex,
                                        a = "select-one" === e.type,
                                        s = a ? null : [],
                                        u = a ? o + 1 : i.length;
                                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !j(n.parentNode, "optgroup"))) {
                                            if (t = k(n).val(), a) return t;
                                            s.push(t)
                                        }
                                    return s
                                },
                                set: function(e, t) {
                                    for (var n, r, i = e.options, o = k.makeArray(t), a = i.length; a--;)((r = i[a]).selected = k.inArray(k.valHooks.option.get(r), o) > -1) && (n = !0);
                                    return n || (e.selectedIndex = -1), o
                                }
                            }
                        }
                    }), k.each(["radio", "checkbox"], (function() {
                        k.valHooks[this] = {
                            set: function(e, t) {
                                if (Array.isArray(t)) return e.checked = k.inArray(k(e).val(), t) > -1
                            }
                        }, v.checkOn || (k.valHooks[this].get = function(e) {
                            return null === e.getAttribute("value") ? "on" : e.value
                        })
                    })), v.focusin = "onfocusin" in r;
                    var wt = /^(?:focusinfocus|focusoutblur)$/,
                        Tt = function(e) {
                            e.stopPropagation()
                        };
                    k.extend(k.event, {
                        trigger: function(e, t, n, i) {
                            var o, a, s, u, l, c, f, d, h = [n || x],
                                g = p.call(e, "type") ? e.type : e,
                                v = p.call(e, "namespace") ? e.namespace.split(".") : [];
                            if (a = d = s = n = n || x, 3 !== n.nodeType && 8 !== n.nodeType && !wt.test(g + k.event.triggered) && (g.indexOf(".") > -1 && (v = g.split("."), g = v.shift(), v.sort()), l = g.indexOf(":") < 0 && "on" + g, (e = e[k.expando] ? e : new k.Event(g, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = v.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : k.makeArray(t, [e]), f = k.event.special[g] || {}, i || !f.trigger || !1 !== f.trigger.apply(n, t))) {
                                if (!i && !f.noBubble && !y(n)) {
                                    for (u = f.delegateType || g, wt.test(u + g) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                                    s === (n.ownerDocument || x) && h.push(s.defaultView || s.parentWindow || r)
                                }
                                for (o = 0;
                                    (a = h[o++]) && !e.isPropagationStopped();) d = a, e.type = o > 1 ? u : f.bindType || g, (c = (K.get(a, "events") || Object.create(null))[e.type] && K.get(a, "handle")) && c.apply(a, t), (c = l && a[l]) && c.apply && Q(a) && (e.result = c.apply(a, t), !1 === e.result && e.preventDefault());
                                return e.type = g, i || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(h.pop(), t) || !Q(n) || l && m(n[g]) && !y(n) && ((s = n[l]) && (n[l] = null), k.event.triggered = g, e.isPropagationStopped() && d.addEventListener(g, Tt), n[g](), e.isPropagationStopped() && d.removeEventListener(g, Tt), k.event.triggered = void 0, s && (n[l] = s)), e.result
                            }
                        },
                        simulate: function(e, t, n) {
                            var r = k.extend(new k.Event, n, {
                                type: e,
                                isSimulated: !0
                            });
                            k.event.trigger(r, null, t)
                        }
                    }), k.fn.extend({
                        trigger: function(e, t) {
                            return this.each((function() {
                                k.event.trigger(e, t, this)
                            }))
                        },
                        triggerHandler: function(e, t) {
                            var n = this[0];
                            if (n) return k.event.trigger(e, t, n, !0)
                        }
                    }), v.focusin || k.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, (function(e, t) {
                        var n = function(e) {
                            k.event.simulate(t, e.target, k.event.fix(e))
                        };
                        k.event.special[t] = {
                            setup: function() {
                                var r = this.ownerDocument || this.document || this,
                                    i = K.access(r, t);
                                i || r.addEventListener(e, n, !0), K.access(r, t, (i || 0) + 1)
                            },
                            teardown: function() {
                                var r = this.ownerDocument || this.document || this,
                                    i = K.access(r, t) - 1;
                                i ? K.access(r, t, i) : (r.removeEventListener(e, n, !0), K.remove(r, t))
                            }
                        }
                    }));
                    var Ct = r.location,
                        kt = {
                            guid: Date.now()
                        },
                        Et = /\?/;
                    k.parseXML = function(e) {
                        var t, n;
                        if (!e || "string" != typeof e) return null;
                        try {
                            t = (new r.DOMParser).parseFromString(e, "text/xml")
                        } catch (e) {}
                        return n = t && t.getElementsByTagName("parsererror")[0], t && !n || k.error("Invalid XML: " + (n ? k.map(n.childNodes, (function(e) {
                            return e.textContent
                        })).join("\n") : e)), t
                    };
                    var St = /\[\]$/,
                        At = /\r?\n/g,
                        Nt = /^(?:submit|button|image|reset|file)$/i,
                        Dt = /^(?:input|select|textarea|keygen)/i;

                    function jt(e, t, n, r) {
                        var i;
                        if (Array.isArray(t)) k.each(t, (function(t, i) {
                            n || St.test(e) ? r(e, i) : jt(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
                        }));
                        else if (n || "object" !== T(t)) r(e, t);
                        else
                            for (i in t) jt(e + "[" + i + "]", t[i], n, r)
                    }
                    k.param = function(e, t) {
                        var n, r = [],
                            i = function(e, t) {
                                var n = m(t) ? t() : t;
                                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                            };
                        if (null == e) return "";
                        if (Array.isArray(e) || e.jquery && !k.isPlainObject(e)) k.each(e, (function() {
                            i(this.name, this.value)
                        }));
                        else
                            for (n in e) jt(n, e[n], t, i);
                        return r.join("&")
                    }, k.fn.extend({
                        serialize: function() {
                            return k.param(this.serializeArray())
                        },
                        serializeArray: function() {
                            return this.map((function() {
                                var e = k.prop(this, "elements");
                                return e ? k.makeArray(e) : this
                            })).filter((function() {
                                var e = this.type;
                                return this.name && !k(this).is(":disabled") && Dt.test(this.nodeName) && !Nt.test(e) && (this.checked || !ve.test(e))
                            })).map((function(e, t) {
                                var n = k(this).val();
                                return null == n ? null : Array.isArray(n) ? k.map(n, (function(e) {
                                    return {
                                        name: t.name,
                                        value: e.replace(At, "\r\n")
                                    }
                                })) : {
                                    name: t.name,
                                    value: n.replace(At, "\r\n")
                                }
                            })).get()
                        }
                    });
                    var Lt = /%20/g,
                        qt = /#.*$/,
                        Ht = /([?&])_=[^&]*/,
                        Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                        Pt = /^(?:GET|HEAD)$/,
                        _t = /^\/\//,
                        Rt = {},
                        Ft = {},
                        Mt = "*/".concat("*"),
                        It = x.createElement("a");

                    function $t(e) {
                        return function(t, n) {
                            "string" != typeof t && (n = t, t = "*");
                            var r, i = 0,
                                o = t.toLowerCase().match(F) || [];
                            if (m(n))
                                for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                        }
                    }

                    function Wt(e, t, n, r) {
                        var i = {},
                            o = e === Ft;

                        function a(s) {
                            var u;
                            return i[s] = !0, k.each(e[s] || [], (function(e, s) {
                                var l = s(t, n, r);
                                return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1)
                            })), u
                        }
                        return a(t.dataTypes[0]) || !i["*"] && a("*")
                    }

                    function Bt(e, t) {
                        var n, r, i = k.ajaxSettings.flatOptions || {};
                        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
                        return r && k.extend(!0, e, r), e
                    }
                    It.href = Ct.href, k.extend({
                        active: 0,
                        lastModified: {},
                        etag: {},
                        ajaxSettings: {
                            url: Ct.href,
                            type: "GET",
                            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ct.protocol),
                            global: !0,
                            processData: !0,
                            async: !0,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            accepts: {
                                "*": Mt,
                                text: "text/plain",
                                html: "text/html",
                                xml: "application/xml, text/xml",
                                json: "application/json, text/javascript"
                            },
                            contents: {
                                xml: /\bxml\b/,
                                html: /\bhtml/,
                                json: /\bjson\b/
                            },
                            responseFields: {
                                xml: "responseXML",
                                text: "responseText",
                                json: "responseJSON"
                            },
                            converters: {
                                "* text": String,
                                "text html": !0,
                                "text json": JSON.parse,
                                "text xml": k.parseXML
                            },
                            flatOptions: {
                                url: !0,
                                context: !0
                            }
                        },
                        ajaxSetup: function(e, t) {
                            return t ? Bt(Bt(e, k.ajaxSettings), t) : Bt(k.ajaxSettings, e)
                        },
                        ajaxPrefilter: $t(Rt),
                        ajaxTransport: $t(Ft),
                        ajax: function(e, t) {
                            "object" == typeof e && (t = e, e = void 0), t = t || {};
                            var n, i, o, a, s, u, l, c, f, d, p = k.ajaxSetup({}, t),
                                h = p.context || p,
                                g = p.context && (h.nodeType || h.jquery) ? k(h) : k.event,
                                v = k.Deferred(),
                                m = k.Callbacks("once memory"),
                                y = p.statusCode || {},
                                b = {},
                                w = {},
                                T = "canceled",
                                C = {
                                    readyState: 0,
                                    getResponseHeader: function(e) {
                                        var t;
                                        if (l) {
                                            if (!a)
                                                for (a = {}; t = Ot.exec(o);) a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                            t = a[e.toLowerCase() + " "]
                                        }
                                        return null == t ? null : t.join(", ")
                                    },
                                    getAllResponseHeaders: function() {
                                        return l ? o : null
                                    },
                                    setRequestHeader: function(e, t) {
                                        return null == l && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, b[e] = t), this
                                    },
                                    overrideMimeType: function(e) {
                                        return null == l && (p.mimeType = e), this
                                    },
                                    statusCode: function(e) {
                                        var t;
                                        if (e)
                                            if (l) C.always(e[C.status]);
                                            else
                                                for (t in e) y[t] = [y[t], e[t]];
                                        return this
                                    },
                                    abort: function(e) {
                                        var t = e || T;
                                        return n && n.abort(t), E(0, t), this
                                    }
                                };
                            if (v.promise(C), p.url = ((e || p.url || Ct.href) + "").replace(_t, Ct.protocol + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(F) || [""], null == p.crossDomain) {
                                u = x.createElement("a");
                                try {
                                    u.href = p.url, u.href = u.href, p.crossDomain = It.protocol + "//" + It.host != u.protocol + "//" + u.host
                                } catch (e) {
                                    p.crossDomain = !0
                                }
                            }
                            if (p.data && p.processData && "string" != typeof p.data && (p.data = k.param(p.data, p.traditional)), Wt(Rt, p, t, C), l) return C;
                            for (f in (c = k.event && p.global) && 0 == k.active++ && k.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Pt.test(p.type), i = p.url.replace(qt, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Lt, "+")) : (d = p.url.slice(i.length), p.data && (p.processData || "string" == typeof p.data) && (i += (Et.test(i) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (i = i.replace(Ht, "$1"), d = (Et.test(i) ? "&" : "?") + "_=" + kt.guid++ + d), p.url = i + d), p.ifModified && (k.lastModified[i] && C.setRequestHeader("If-Modified-Since", k.lastModified[i]), k.etag[i] && C.setRequestHeader("If-None-Match", k.etag[i])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Mt + "; q=0.01" : "") : p.accepts["*"]), p.headers) C.setRequestHeader(f, p.headers[f]);
                            if (p.beforeSend && (!1 === p.beforeSend.call(h, C, p) || l)) return C.abort();
                            if (T = "abort", m.add(p.complete), C.done(p.success), C.fail(p.error), n = Wt(Ft, p, t, C)) {
                                if (C.readyState = 1, c && g.trigger("ajaxSend", [C, p]), l) return C;
                                p.async && p.timeout > 0 && (s = r.setTimeout((function() {
                                    C.abort("timeout")
                                }), p.timeout));
                                try {
                                    l = !1, n.send(b, E)
                                } catch (e) {
                                    if (l) throw e;
                                    E(-1, e)
                                }
                            } else E(-1, "No Transport");

                            function E(e, t, a, u) {
                                var f, d, x, b, w, T = t;
                                l || (l = !0, s && r.clearTimeout(s), n = void 0, o = u || "", C.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || 304 === e, a && (b = function(e, t, n) {
                                    for (var r, i, o, a, s = e.contents, u = e.dataTypes;
                                        "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                                    if (r)
                                        for (i in s)
                                            if (s[i] && s[i].test(r)) {
                                                u.unshift(i);
                                                break
                                            }
                                    if (u[0] in n) o = u[0];
                                    else {
                                        for (i in n) {
                                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                                o = i;
                                                break
                                            }
                                            a || (a = i)
                                        }
                                        o = o || a
                                    }
                                    if (o) return o !== u[0] && u.unshift(o), n[o]
                                }(p, C, a)), !f && k.inArray("script", p.dataTypes) > -1 && k.inArray("json", p.dataTypes) < 0 && (p.converters["text script"] = function() {}), b = function(e, t, n, r) {
                                    var i, o, a, s, u, l = {},
                                        c = e.dataTypes.slice();
                                    if (c[1])
                                        for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                                    for (o = c.shift(); o;)
                                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                                            if ("*" === o) o = u;
                                            else if ("*" !== u && u !== o) {
                                        if (!(a = l[u + " " + o] || l["* " + o]))
                                            for (i in l)
                                                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                                    !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                                                    break
                                                }
                                        if (!0 !== a)
                                            if (a && e.throws) t = a(t);
                                            else try {
                                                t = a(t)
                                            } catch (e) {
                                                return {
                                                    state: "parsererror",
                                                    error: a ? e : "No conversion from " + u + " to " + o
                                                }
                                            }
                                    }
                                    return {
                                        state: "success",
                                        data: t
                                    }
                                }(p, b, C, f), f ? (p.ifModified && ((w = C.getResponseHeader("Last-Modified")) && (k.lastModified[i] = w), (w = C.getResponseHeader("etag")) && (k.etag[i] = w)), 204 === e || "HEAD" === p.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = b.state, d = b.data, f = !(x = b.error))) : (x = T, !e && T || (T = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (t || T) + "", f ? v.resolveWith(h, [d, T, C]) : v.rejectWith(h, [C, T, x]), C.statusCode(y), y = void 0, c && g.trigger(f ? "ajaxSuccess" : "ajaxError", [C, p, f ? d : x]), m.fireWith(h, [C, T]), c && (g.trigger("ajaxComplete", [C, p]), --k.active || k.event.trigger("ajaxStop")))
                            }
                            return C
                        },
                        getJSON: function(e, t, n) {
                            return k.get(e, t, n, "json")
                        },
                        getScript: function(e, t) {
                            return k.get(e, void 0, t, "script")
                        }
                    }), k.each(["get", "post"], (function(e, t) {
                        k[t] = function(e, n, r, i) {
                            return m(n) && (i = i || r, r = n, n = void 0), k.ajax(k.extend({
                                url: e,
                                type: t,
                                dataType: i,
                                data: n,
                                success: r
                            }, k.isPlainObject(e) && e))
                        }
                    })), k.ajaxPrefilter((function(e) {
                        var t;
                        for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
                    })), k._evalUrl = function(e, t, n) {
                        return k.ajax({
                            url: e,
                            type: "GET",
                            dataType: "script",
                            cache: !0,
                            async: !1,
                            global: !1,
                            converters: {
                                "text script": function() {}
                            },
                            dataFilter: function(e) {
                                k.globalEval(e, t, n)
                            }
                        })
                    }, k.fn.extend({
                        wrapAll: function(e) {
                            var t;
                            return this[0] && (m(e) && (e = e.call(this[0])), t = k(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                                return e
                            })).append(this)), this
                        },
                        wrapInner: function(e) {
                            return m(e) ? this.each((function(t) {
                                k(this).wrapInner(e.call(this, t))
                            })) : this.each((function() {
                                var t = k(this),
                                    n = t.contents();
                                n.length ? n.wrapAll(e) : t.append(e)
                            }))
                        },
                        wrap: function(e) {
                            var t = m(e);
                            return this.each((function(n) {
                                k(this).wrapAll(t ? e.call(this, n) : e)
                            }))
                        },
                        unwrap: function(e) {
                            return this.parent(e).not("body").each((function() {
                                k(this).replaceWith(this.childNodes)
                            })), this
                        }
                    }), k.expr.pseudos.hidden = function(e) {
                        return !k.expr.pseudos.visible(e)
                    }, k.expr.pseudos.visible = function(e) {
                        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
                    }, k.ajaxSettings.xhr = function() {
                        try {
                            return new r.XMLHttpRequest
                        } catch (e) {}
                    };
                    var zt = {
                            0: 200,
                            1223: 204
                        },
                        Ut = k.ajaxSettings.xhr();
                    v.cors = !!Ut && "withCredentials" in Ut, v.ajax = Ut = !!Ut, k.ajaxTransport((function(e) {
                        var t, n;
                        if (v.cors || Ut && !e.crossDomain) return {
                            send: function(i, o) {
                                var a, s = e.xhr();
                                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                                    for (a in e.xhrFields) s[a] = e.xhrFields[a];
                                for (a in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) s.setRequestHeader(a, i[a]);
                                t = function(e) {
                                    return function() {
                                        t && (t = n = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(zt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                            binary: s.response
                                        } : {
                                            text: s.responseText
                                        }, s.getAllResponseHeaders()))
                                    }
                                }, s.onload = t(), n = s.onerror = s.ontimeout = t("error"), void 0 !== s.onabort ? s.onabort = n : s.onreadystatechange = function() {
                                    4 === s.readyState && r.setTimeout((function() {
                                        t && n()
                                    }))
                                }, t = t("abort");
                                try {
                                    s.send(e.hasContent && e.data || null)
                                } catch (e) {
                                    if (t) throw e
                                }
                            },
                            abort: function() {
                                t && t()
                            }
                        }
                    })), k.ajaxPrefilter((function(e) {
                        e.crossDomain && (e.contents.script = !1)
                    })), k.ajaxSetup({
                        accepts: {
                            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                        },
                        contents: {
                            script: /\b(?:java|ecma)script\b/
                        },
                        converters: {
                            "text script": function(e) {
                                return k.globalEval(e), e
                            }
                        }
                    }), k.ajaxPrefilter("script", (function(e) {
                        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
                    })), k.ajaxTransport("script", (function(e) {
                        var t, n;
                        if (e.crossDomain || e.scriptAttrs) return {
                            send: function(r, i) {
                                t = k("<script>").attr(e.scriptAttrs || {}).prop({
                                    charset: e.scriptCharset,
                                    src: e.url
                                }).on("load error", n = function(e) {
                                    t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                                }), x.head.appendChild(t[0])
                            },
                            abort: function() {
                                n && n()
                            }
                        }
                    }));
                    var Xt, Vt = [],
                        Gt = /(=)\?(?=&|$)|\?\?/;
                    k.ajaxSetup({
                        jsonp: "callback",
                        jsonpCallback: function() {
                            var e = Vt.pop() || k.expando + "_" + kt.guid++;
                            return this[e] = !0, e
                        }
                    }), k.ajaxPrefilter("json jsonp", (function(e, t, n) {
                        var i, o, a, s = !1 !== e.jsonp && (Gt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Gt.test(e.data) && "data");
                        if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Gt, "$1" + i) : !1 !== e.jsonp && (e.url += (Et.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
                            return a || k.error(i + " was not called"), a[0]
                        }, e.dataTypes[0] = "json", o = r[i], r[i] = function() {
                            a = arguments
                        }, n.always((function() {
                            void 0 === o ? k(r).removeProp(i) : r[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, Vt.push(i)), a && m(o) && o(a[0]), a = o = void 0
                        })), "script"
                    })), v.createHTMLDocument = ((Xt = x.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Xt.childNodes.length), k.parseHTML = function(e, t, n) {
                        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (v.createHTMLDocument ? ((r = (t = x.implementation.createHTMLDocument("")).createElement("base")).href = x.location.href, t.head.appendChild(r)) : t = x), o = !n && [], (i = L.exec(e)) ? [t.createElement(i[1])] : (i = Ce([e], t, o), o && o.length && k(o).remove(), k.merge([], i.childNodes)));
                        var r, i, o
                    }, k.fn.load = function(e, t, n) {
                        var r, i, o, a = this,
                            s = e.indexOf(" ");
                        return s > -1 && (r = mt(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && k.ajax({
                            url: e,
                            type: i || "GET",
                            dataType: "html",
                            data: t
                        }).done((function(e) {
                            o = arguments, a.html(r ? k("<div>").append(k.parseHTML(e)).find(r) : e)
                        })).always(n && function(e, t) {
                            a.each((function() {
                                n.apply(this, o || [e.responseText, t, e])
                            }))
                        }), this
                    }, k.expr.pseudos.animated = function(e) {
                        return k.grep(k.timers, (function(t) {
                            return e === t.elem
                        })).length
                    }, k.offset = {
                        setOffset: function(e, t, n) {
                            var r, i, o, a, s, u, l = k.css(e, "position"),
                                c = k(e),
                                f = {};
                            "static" === l && (e.style.position = "relative"), s = c.offset(), o = k.css(e, "top"), u = k.css(e, "left"), ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1 ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, k.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
                        }
                    }, k.fn.extend({
                        offset: function(e) {
                            if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                                k.offset.setOffset(this, e, t)
                            }));
                            var t, n, r = this[0];
                            return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                                top: t.top + n.pageYOffset,
                                left: t.left + n.pageXOffset
                            }) : {
                                top: 0,
                                left: 0
                            } : void 0
                        },
                        position: function() {
                            if (this[0]) {
                                var e, t, n, r = this[0],
                                    i = {
                                        top: 0,
                                        left: 0
                                    };
                                if ("fixed" === k.css(r, "position")) t = r.getBoundingClientRect();
                                else {
                                    for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === k.css(e, "position");) e = e.parentNode;
                                    e && e !== r && 1 === e.nodeType && ((i = k(e).offset()).top += k.css(e, "borderTopWidth", !0), i.left += k.css(e, "borderLeftWidth", !0))
                                }
                                return {
                                    top: t.top - i.top - k.css(r, "marginTop", !0),
                                    left: t.left - i.left - k.css(r, "marginLeft", !0)
                                }
                            }
                        },
                        offsetParent: function() {
                            return this.map((function() {
                                for (var e = this.offsetParent; e && "static" === k.css(e, "position");) e = e.offsetParent;
                                return e || ae
                            }))
                        }
                    }), k.each({
                        scrollLeft: "pageXOffset",
                        scrollTop: "pageYOffset"
                    }, (function(e, t) {
                        var n = "pageYOffset" === t;
                        k.fn[e] = function(r) {
                            return U(this, (function(e, r, i) {
                                var o;
                                if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];
                                o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
                            }), e, r, arguments.length)
                        }
                    })), k.each(["top", "left"], (function(e, t) {
                        k.cssHooks[t] = Ue(v.pixelPosition, (function(e, n) {
                            if (n) return n = ze(e, t), Ie.test(n) ? k(e).position()[t] + "px" : n
                        }))
                    })), k.each({
                        Height: "height",
                        Width: "width"
                    }, (function(e, t) {
                        k.each({
                            padding: "inner" + e,
                            content: t,
                            "": "outer" + e
                        }, (function(n, r) {
                            k.fn[r] = function(i, o) {
                                var a = arguments.length && (n || "boolean" != typeof i),
                                    s = n || (!0 === i || !0 === o ? "margin" : "border");
                                return U(this, (function(t, n, i) {
                                    var o;
                                    return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? k.css(t, n, s) : k.style(t, n, i, s)
                                }), t, a ? i : void 0, a)
                            }
                        }))
                    })), k.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
                        k.fn[t] = function(e) {
                            return this.on(t, e)
                        }
                    })), k.fn.extend({
                        bind: function(e, t, n) {
                            return this.on(e, null, t, n)
                        },
                        unbind: function(e, t) {
                            return this.off(e, null, t)
                        },
                        delegate: function(e, t, n, r) {
                            return this.on(t, e, n, r)
                        },
                        undelegate: function(e, t, n) {
                            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                        },
                        hover: function(e, t) {
                            return this.mouseenter(e).mouseleave(t || e)
                        }
                    }), k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
                        k.fn[t] = function(e, n) {
                            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                        }
                    }));
                    var Yt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                    k.proxy = function(e, t) {
                        var n, r, i;
                        if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), i = function() {
                            return e.apply(t || this, r.concat(s.call(arguments)))
                        }, i.guid = e.guid = e.guid || k.guid++, i
                    }, k.holdReady = function(e) {
                        e ? k.readyWait++ : k.ready(!0)
                    }, k.isArray = Array.isArray, k.parseJSON = JSON.parse, k.nodeName = j, k.isFunction = m, k.isWindow = y, k.camelCase = Y, k.type = T, k.now = Date.now, k.isNumeric = function(e) {
                        var t = k.type(e);
                        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
                    }, k.trim = function(e) {
                        return null == e ? "" : (e + "").replace(Yt, "")
                    }, void 0 === (n = function() {
                        return k
                    }.apply(t, [])) || (e.exports = n);
                    var Qt = r.jQuery,
                        Jt = r.$;
                    return k.noConflict = function(e) {
                        return r.$ === k && (r.$ = Jt), e && r.jQuery === k && (r.jQuery = Qt), k
                    }, void 0 === i && (r.jQuery = r.$ = k), k
                }))
            },
            825: function(e, t) {
                var n;
                ! function(t, n) {
                    "use strict";
                    "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(e) {
                        if (!e.document) throw new Error("jQuery requires a window with a document");
                        return n(e)
                    } : n(t)
                }("undefined" != typeof window ? window : this, (function(r, i) {
                    "use strict";
                    var o = [],
                        a = Object.getPrototypeOf,
                        s = o.slice,
                        u = o.flat ? function(e) {
                            return o.flat.call(e)
                        } : function(e) {
                            return o.concat.apply([], e)
                        },
                        l = o.push,
                        c = o.indexOf,
                        f = {},
                        d = f.toString,
                        p = f.hasOwnProperty,
                        h = p.toString,
                        g = h.call(Object),
                        v = {},
                        m = function(e) {
                            return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
                        },
                        y = function(e) {
                            return null != e && e === e.window
                        },
                        x = r.document,
                        b = {
                            type: !0,
                            src: !0,
                            nonce: !0,
                            noModule: !0
                        };

                    function w(e, t, n) {
                        var r, i, o = (n = n || x).createElement("script");
                        if (o.text = e, t)
                            for (r in b)(i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
                        n.head.appendChild(o).parentNode.removeChild(o)
                    }

                    function T(e) {
                        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? f[d.call(e)] || "object" : typeof e
                    }
                    var C = "3.6.0",
                        k = function(e, t) {
                            return new k.fn.init(e, t)
                        };

                    function E(e) {
                        var t = !!e && "length" in e && e.length,
                            n = T(e);
                        return !m(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
                    }
                    k.fn = k.prototype = {
                        jquery: C,
                        constructor: k,
                        length: 0,
                        toArray: function() {
                            return s.call(this)
                        },
                        get: function(e) {
                            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
                        },
                        pushStack: function(e) {
                            var t = k.merge(this.constructor(), e);
                            return t.prevObject = this, t
                        },
                        each: function(e) {
                            return k.each(this, e)
                        },
                        map: function(e) {
                            return this.pushStack(k.map(this, (function(t, n) {
                                return e.call(t, n, t)
                            })))
                        },
                        slice: function() {
                            return this.pushStack(s.apply(this, arguments))
                        },
                        first: function() {
                            return this.eq(0)
                        },
                        last: function() {
                            return this.eq(-1)
                        },
                        even: function() {
                            return this.pushStack(k.grep(this, (function(e, t) {
                                return (t + 1) % 2
                            })))
                        },
                        odd: function() {
                            return this.pushStack(k.grep(this, (function(e, t) {
                                return t % 2
                            })))
                        },
                        eq: function(e) {
                            var t = this.length,
                                n = +e + (e < 0 ? t : 0);
                            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
                        },
                        end: function() {
                            return this.prevObject || this.constructor()
                        },
                        push: l,
                        sort: o.sort,
                        splice: o.splice
                    }, k.extend = k.fn.extend = function() {
                        var e, t, n, r, i, o, a = arguments[0] || {},
                            s = 1,
                            u = arguments.length,
                            l = !1;
                        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
                            if (null != (e = arguments[s]))
                                for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (k.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || k.isPlainObject(n) ? n : {}, i = !1, a[t] = k.extend(l, o, r)) : void 0 !== r && (a[t] = r));
                        return a
                    }, k.extend({
                        expando: "jQuery" + (C + Math.random()).replace(/\D/g, ""),
                        isReady: !0,
                        error: function(e) {
                            throw new Error(e)
                        },
                        noop: function() {},
                        isPlainObject: function(e) {
                            var t, n;
                            return !(!e || "[object Object]" !== d.call(e) || (t = a(e)) && ("function" != typeof(n = p.call(t, "constructor") && t.constructor) || h.call(n) !== g))
                        },
                        isEmptyObject: function(e) {
                            var t;
                            for (t in e) return !1;
                            return !0
                        },
                        globalEval: function(e, t, n) {
                            w(e, {
                                nonce: t && t.nonce
                            }, n)
                        },
                        each: function(e, t) {
                            var n, r = 0;
                            if (E(e))
                                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
                            else
                                for (r in e)
                                    if (!1 === t.call(e[r], r, e[r])) break;
                            return e
                        },
                        makeArray: function(e, t) {
                            var n = t || [];
                            return null != e && (E(Object(e)) ? k.merge(n, "string" == typeof e ? [e] : e) : l.call(n, e)), n
                        },
                        inArray: function(e, t, n) {
                            return null == t ? -1 : c.call(t, e, n)
                        },
                        merge: function(e, t) {
                            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
                            return e.length = i, e
                        },
                        grep: function(e, t, n) {
                            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
                            return r
                        },
                        map: function(e, t, n) {
                            var r, i, o = 0,
                                a = [];
                            if (E(e))
                                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
                            else
                                for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
                            return u(a)
                        },
                        guid: 1,
                        support: v
                    }), "function" == typeof Symbol && (k.fn[Symbol.iterator] = o[Symbol.iterator]), k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                        f["[object " + t + "]"] = t.toLowerCase()
                    }));
                    var S = function(e) {
                        var t, n, r, i, o, a, s, u, l, c, f, d, p, h, g, v, m, y, x, b = "sizzle" + 1 * new Date,
                            w = e.document,
                            T = 0,
                            C = 0,
                            k = ue(),
                            E = ue(),
                            S = ue(),
                            A = ue(),
                            N = function(e, t) {
                                return e === t && (f = !0), 0
                            },
                            D = {}.hasOwnProperty,
                            j = [],
                            L = j.pop,
                            q = j.push,
                            H = j.push,
                            O = j.slice,
                            P = function(e, t) {
                                for (var n = 0, r = e.length; n < r; n++)
                                    if (e[n] === t) return n;
                                return -1
                            },
                            _ = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                            R = "[\\x20\\t\\r\\n\\f]",
                            F = "(?:\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                            M = "\\[" + R + "*(" + F + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + F + "))|)" + R + "*\\]",
                            I = ":(" + F + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
                            $ = new RegExp(R + "+", "g"),
                            W = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
                            B = new RegExp("^" + R + "*," + R + "*"),
                            z = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
                            U = new RegExp(R + "|>"),
                            X = new RegExp(I),
                            V = new RegExp("^" + F + "$"),
                            G = {
                                ID: new RegExp("^#(" + F + ")"),
                                CLASS: new RegExp("^\\.(" + F + ")"),
                                TAG: new RegExp("^(" + F + "|[*])"),
                                ATTR: new RegExp("^" + M),
                                PSEUDO: new RegExp("^" + I),
                                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                                bool: new RegExp("^(?:" + _ + ")$", "i"),
                                needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
                            },
                            Y = /HTML$/i,
                            Q = /^(?:input|select|textarea|button)$/i,
                            J = /^h\d$/i,
                            K = /^[^{]+\{\s*\[native \w/,
                            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                            ee = /[+~]/,
                            te = new RegExp("\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\([^\\r\\n\\f])", "g"),
                            ne = function(e, t) {
                                var n = "0x" + e.slice(1) - 65536;
                                return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
                            },
                            re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                            ie = function(e, t) {
                                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                            },
                            oe = function() {
                                d()
                            },
                            ae = be((function(e) {
                                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                            }), {
                                dir: "parentNode",
                                next: "legend"
                            });
                        try {
                            H.apply(j = O.call(w.childNodes), w.childNodes), j[w.childNodes.length].nodeType
                        } catch (t) {
                            H = {
                                apply: j.length ? function(e, t) {
                                    q.apply(e, O.call(t))
                                } : function(e, t) {
                                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                                    e.length = n - 1
                                }
                            }
                        }

                        function se(e, t, r, i) {
                            var o, s, l, c, f, h, m, y = t && t.ownerDocument,
                                w = t ? t.nodeType : 9;
                            if (r = r || [], "string" != typeof e || !e || 1 !== w && 9 !== w && 11 !== w) return r;
                            if (!i && (d(t), t = t || p, g)) {
                                if (11 !== w && (f = Z.exec(e)))
                                    if (o = f[1]) {
                                        if (9 === w) {
                                            if (!(l = t.getElementById(o))) return r;
                                            if (l.id === o) return r.push(l), r
                                        } else if (y && (l = y.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r
                                    } else {
                                        if (f[2]) return H.apply(r, t.getElementsByTagName(e)), r;
                                        if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return H.apply(r, t.getElementsByClassName(o)), r
                                    }
                                if (n.qsa && !A[e + " "] && (!v || !v.test(e)) && (1 !== w || "object" !== t.nodeName.toLowerCase())) {
                                    if (m = e, y = t, 1 === w && (U.test(e) || z.test(e))) {
                                        for ((y = ee.test(e) && me(t.parentNode) || t) === t && n.scope || ((c = t.getAttribute("id")) ? c = c.replace(re, ie) : t.setAttribute("id", c = b)), s = (h = a(e)).length; s--;) h[s] = (c ? "#" + c : ":scope") + " " + xe(h[s]);
                                        m = h.join(",")
                                    }
                                    try {
                                        return H.apply(r, y.querySelectorAll(m)), r
                                    } catch (t) {
                                        A(e, !0)
                                    } finally {
                                        c === b && t.removeAttribute("id")
                                    }
                                }
                            }
                            return u(e.replace(W, "$1"), t, r, i)
                        }

                        function ue() {
                            var e = [];
                            return function t(n, i) {
                                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                            }
                        }

                        function le(e) {
                            return e[b] = !0, e
                        }

                        function ce(e) {
                            var t = p.createElement("fieldset");
                            try {
                                return !!e(t)
                            } catch (e) {
                                return !1
                            } finally {
                                t.parentNode && t.parentNode.removeChild(t), t = null
                            }
                        }

                        function fe(e, t) {
                            for (var n = e.split("|"), i = n.length; i--;) r.attrHandle[n[i]] = t
                        }

                        function de(e, t) {
                            var n = t && e,
                                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                            if (r) return r;
                            if (n)
                                for (; n = n.nextSibling;)
                                    if (n === t) return -1;
                            return e ? 1 : -1
                        }

                        function pe(e) {
                            return function(t) {
                                return "input" === t.nodeName.toLowerCase() && t.type === e
                            }
                        }

                        function he(e) {
                            return function(t) {
                                var n = t.nodeName.toLowerCase();
                                return ("input" === n || "button" === n) && t.type === e
                            }
                        }

                        function ge(e) {
                            return function(t) {
                                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label" in t && t.disabled === e
                            }
                        }

                        function ve(e) {
                            return le((function(t) {
                                return t = +t, le((function(n, r) {
                                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                                }))
                            }))
                        }

                        function me(e) {
                            return e && void 0 !== e.getElementsByTagName && e
                        }
                        for (t in n = se.support = {}, o = se.isXML = function(e) {
                                var t = e && e.namespaceURI,
                                    n = e && (e.ownerDocument || e).documentElement;
                                return !Y.test(t || n && n.nodeName || "HTML")
                            }, d = se.setDocument = function(e) {
                                var t, i, a = e ? e.ownerDocument || e : w;
                                return a != p && 9 === a.nodeType && a.documentElement && (h = (p = a).documentElement, g = !o(p), w != p && (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", oe, !1) : i.attachEvent && i.attachEvent("onunload", oe)), n.scope = ce((function(e) {
                                    return h.appendChild(e).appendChild(p.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                                })), n.attributes = ce((function(e) {
                                    return e.className = "i", !e.getAttribute("className")
                                })), n.getElementsByTagName = ce((function(e) {
                                    return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
                                })), n.getElementsByClassName = K.test(p.getElementsByClassName), n.getById = ce((function(e) {
                                    return h.appendChild(e).id = b, !p.getElementsByName || !p.getElementsByName(b).length
                                })), n.getById ? (r.filter.ID = function(e) {
                                    var t = e.replace(te, ne);
                                    return function(e) {
                                        return e.getAttribute("id") === t
                                    }
                                }, r.find.ID = function(e, t) {
                                    if (void 0 !== t.getElementById && g) {
                                        var n = t.getElementById(e);
                                        return n ? [n] : []
                                    }
                                }) : (r.filter.ID = function(e) {
                                    var t = e.replace(te, ne);
                                    return function(e) {
                                        var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                        return n && n.value === t
                                    }
                                }, r.find.ID = function(e, t) {
                                    if (void 0 !== t.getElementById && g) {
                                        var n, r, i, o = t.getElementById(e);
                                        if (o) {
                                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                                            for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                                                if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                                        }
                                        return []
                                    }
                                }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                                } : function(e, t) {
                                    var n, r = [],
                                        i = 0,
                                        o = t.getElementsByTagName(e);
                                    if ("*" === e) {
                                        for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                                        return r
                                    }
                                    return o
                                }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                                    if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e)
                                }, m = [], v = [], (n.qsa = K.test(p.querySelectorAll)) && (ce((function(e) {
                                    var t;
                                    h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + R + "*(?:value|" + _ + ")"), e.querySelectorAll("[id~=" + b + "-]").length || v.push("~="), (t = p.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + R + "*name" + R + "*=" + R + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]")
                                })), ce((function(e) {
                                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                    var t = p.createElement("input");
                                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + R + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
                                }))), (n.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ce((function(e) {
                                    n.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), m.push("!=", I)
                                })), v = v.length && new RegExp(v.join("|")), m = m.length && new RegExp(m.join("|")), t = K.test(h.compareDocumentPosition), x = t || K.test(h.contains) ? function(e, t) {
                                    var n = 9 === e.nodeType ? e.documentElement : e,
                                        r = t && t.parentNode;
                                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                                } : function(e, t) {
                                    if (t)
                                        for (; t = t.parentNode;)
                                            if (t === e) return !0;
                                    return !1
                                }, N = t ? function(e, t) {
                                    if (e === t) return f = !0, 0;
                                    var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                    return r || (1 & (r = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e == p || e.ownerDocument == w && x(w, e) ? -1 : t == p || t.ownerDocument == w && x(w, t) ? 1 : c ? P(c, e) - P(c, t) : 0 : 4 & r ? -1 : 1)
                                } : function(e, t) {
                                    if (e === t) return f = !0, 0;
                                    var n, r = 0,
                                        i = e.parentNode,
                                        o = t.parentNode,
                                        a = [e],
                                        s = [t];
                                    if (!i || !o) return e == p ? -1 : t == p ? 1 : i ? -1 : o ? 1 : c ? P(c, e) - P(c, t) : 0;
                                    if (i === o) return de(e, t);
                                    for (n = e; n = n.parentNode;) a.unshift(n);
                                    for (n = t; n = n.parentNode;) s.unshift(n);
                                    for (; a[r] === s[r];) r++;
                                    return r ? de(a[r], s[r]) : a[r] == w ? -1 : s[r] == w ? 1 : 0
                                }), p
                            }, se.matches = function(e, t) {
                                return se(e, null, null, t)
                            }, se.matchesSelector = function(e, t) {
                                if (d(e), n.matchesSelector && g && !A[t + " "] && (!m || !m.test(t)) && (!v || !v.test(t))) try {
                                    var r = y.call(e, t);
                                    if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                                } catch (e) {
                                    A(t, !0)
                                }
                                return 0 < se(t, p, null, [e]).length
                            }, se.contains = function(e, t) {
                                return (e.ownerDocument || e) != p && d(e), x(e, t)
                            }, se.attr = function(e, t) {
                                (e.ownerDocument || e) != p && d(e);
                                var i = r.attrHandle[t.toLowerCase()],
                                    o = i && D.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
                                return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
                            }, se.escape = function(e) {
                                return (e + "").replace(re, ie)
                            }, se.error = function(e) {
                                throw new Error("Syntax error, unrecognized expression: " + e)
                            }, se.uniqueSort = function(e) {
                                var t, r = [],
                                    i = 0,
                                    o = 0;
                                if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(N), f) {
                                    for (; t = e[o++];) t === e[o] && (i = r.push(o));
                                    for (; i--;) e.splice(r[i], 1)
                                }
                                return c = null, e
                            }, i = se.getText = function(e) {
                                var t, n = "",
                                    r = 0,
                                    o = e.nodeType;
                                if (o) {
                                    if (1 === o || 9 === o || 11 === o) {
                                        if ("string" == typeof e.textContent) return e.textContent;
                                        for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                                    } else if (3 === o || 4 === o) return e.nodeValue
                                } else
                                    for (; t = e[r++];) n += i(t);
                                return n
                            }, (r = se.selectors = {
                                cacheLength: 50,
                                createPseudo: le,
                                match: G,
                                attrHandle: {},
                                find: {},
                                relative: {
                                    ">": {
                                        dir: "parentNode",
                                        first: !0
                                    },
                                    " ": {
                                        dir: "parentNode"
                                    },
                                    "+": {
                                        dir: "previousSibling",
                                        first: !0
                                    },
                                    "~": {
                                        dir: "previousSibling"
                                    }
                                },
                                preFilter: {
                                    ATTR: function(e) {
                                        return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                                    },
                                    CHILD: function(e) {
                                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e
                                    },
                                    PSEUDO: function(e) {
                                        var t, n = !e[6] && e[2];
                                        return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                                    }
                                },
                                filter: {
                                    TAG: function(e) {
                                        var t = e.replace(te, ne).toLowerCase();
                                        return "*" === e ? function() {
                                            return !0
                                        } : function(e) {
                                            return e.nodeName && e.nodeName.toLowerCase() === t
                                        }
                                    },
                                    CLASS: function(e) {
                                        var t = k[e + " "];
                                        return t || (t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && k(e, (function(e) {
                                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                        }))
                                    },
                                    ATTR: function(e, t, n) {
                                        return function(r) {
                                            var i = se.attr(r, e);
                                            return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && -1 < i.indexOf(n) : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? -1 < (" " + i.replace($, " ") + " ").indexOf(n) : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                                        }
                                    },
                                    CHILD: function(e, t, n, r, i) {
                                        var o = "nth" !== e.slice(0, 3),
                                            a = "last" !== e.slice(-4),
                                            s = "of-type" === t;
                                        return 1 === r && 0 === i ? function(e) {
                                            return !!e.parentNode
                                        } : function(t, n, u) {
                                            var l, c, f, d, p, h, g = o !== a ? "nextSibling" : "previousSibling",
                                                v = t.parentNode,
                                                m = s && t.nodeName.toLowerCase(),
                                                y = !u && !s,
                                                x = !1;
                                            if (v) {
                                                if (o) {
                                                    for (; g;) {
                                                        for (d = t; d = d[g];)
                                                            if (s ? d.nodeName.toLowerCase() === m : 1 === d.nodeType) return !1;
                                                        h = g = "only" === e && !h && "nextSibling"
                                                    }
                                                    return !0
                                                }
                                                if (h = [a ? v.firstChild : v.lastChild], a && y) {
                                                    for (x = (p = (l = (c = (f = (d = v)[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], d = p && v.childNodes[p]; d = ++p && d && d[g] || (x = p = 0) || h.pop();)
                                                        if (1 === d.nodeType && ++x && d === t) {
                                                            c[e] = [T, p, x];
                                                            break
                                                        }
                                                } else if (y && (x = p = (l = (c = (f = (d = t)[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x)
                                                    for (;
                                                        (d = ++p && d && d[g] || (x = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++x || (y && ((c = (f = d[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] = [T, x]), d !== t)););
                                                return (x -= i) === r || x % r == 0 && 0 <= x / r
                                            }
                                        }
                                    },
                                    PSEUDO: function(e, t) {
                                        var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                                        return i[b] ? i(t) : 1 < i.length ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? le((function(e, n) {
                                            for (var r, o = i(e, t), a = o.length; a--;) e[r = P(e, o[a])] = !(n[r] = o[a])
                                        })) : function(e) {
                                            return i(e, 0, n)
                                        }) : i
                                    }
                                },
                                pseudos: {
                                    not: le((function(e) {
                                        var t = [],
                                            n = [],
                                            r = s(e.replace(W, "$1"));
                                        return r[b] ? le((function(e, t, n, i) {
                                            for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                                        })) : function(e, i, o) {
                                            return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                                        }
                                    })),
                                    has: le((function(e) {
                                        return function(t) {
                                            return 0 < se(e, t).length
                                        }
                                    })),
                                    contains: le((function(e) {
                                        return e = e.replace(te, ne),
                                            function(t) {
                                                return -1 < (t.textContent || i(t)).indexOf(e)
                                            }
                                    })),
                                    lang: le((function(e) {
                                        return V.test(e || "") || se.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
                                            function(t) {
                                                var n;
                                                do {
                                                    if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                                return !1
                                            }
                                    })),
                                    target: function(t) {
                                        var n = e.location && e.location.hash;
                                        return n && n.slice(1) === t.id
                                    },
                                    root: function(e) {
                                        return e === h
                                    },
                                    focus: function(e) {
                                        return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                    },
                                    enabled: ge(!1),
                                    disabled: ge(!0),
                                    checked: function(e) {
                                        var t = e.nodeName.toLowerCase();
                                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                                    },
                                    selected: function(e) {
                                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                                    },
                                    empty: function(e) {
                                        for (e = e.firstChild; e; e = e.nextSibling)
                                            if (e.nodeType < 6) return !1;
                                        return !0
                                    },
                                    parent: function(e) {
                                        return !r.pseudos.empty(e)
                                    },
                                    header: function(e) {
                                        return J.test(e.nodeName)
                                    },
                                    input: function(e) {
                                        return Q.test(e.nodeName)
                                    },
                                    button: function(e) {
                                        var t = e.nodeName.toLowerCase();
                                        return "input" === t && "button" === e.type || "button" === t
                                    },
                                    text: function(e) {
                                        var t;
                                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                                    },
                                    first: ve((function() {
                                        return [0]
                                    })),
                                    last: ve((function(e, t) {
                                        return [t - 1]
                                    })),
                                    eq: ve((function(e, t, n) {
                                        return [n < 0 ? n + t : n]
                                    })),
                                    even: ve((function(e, t) {
                                        for (var n = 0; n < t; n += 2) e.push(n);
                                        return e
                                    })),
                                    odd: ve((function(e, t) {
                                        for (var n = 1; n < t; n += 2) e.push(n);
                                        return e
                                    })),
                                    lt: ve((function(e, t, n) {
                                        for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) e.push(r);
                                        return e
                                    })),
                                    gt: ve((function(e, t, n) {
                                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                                        return e
                                    }))
                                }
                            }).pseudos.nth = r.pseudos.eq, {
                                radio: !0,
                                checkbox: !0,
                                file: !0,
                                password: !0,
                                image: !0
                            }) r.pseudos[t] = pe(t);
                        for (t in {
                                submit: !0,
                                reset: !0
                            }) r.pseudos[t] = he(t);

                        function ye() {}

                        function xe(e) {
                            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                            return r
                        }

                        function be(e, t, n) {
                            var r = t.dir,
                                i = t.next,
                                o = i || r,
                                a = n && "parentNode" === o,
                                s = C++;
                            return t.first ? function(t, n, i) {
                                for (; t = t[r];)
                                    if (1 === t.nodeType || a) return e(t, n, i);
                                return !1
                            } : function(t, n, u) {
                                var l, c, f, d = [T, s];
                                if (u) {
                                    for (; t = t[r];)
                                        if ((1 === t.nodeType || a) && e(t, n, u)) return !0
                                } else
                                    for (; t = t[r];)
                                        if (1 === t.nodeType || a)
                                            if (c = (f = t[b] || (t[b] = {}))[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                                            else {
                                                if ((l = c[o]) && l[0] === T && l[1] === s) return d[2] = l[2];
                                                if ((c[o] = d)[2] = e(t, n, u)) return !0
                                            } return !1
                            }
                        }

                        function we(e) {
                            return 1 < e.length ? function(t, n, r) {
                                for (var i = e.length; i--;)
                                    if (!e[i](t, n, r)) return !1;
                                return !0
                            } : e[0]
                        }

                        function Te(e, t, n, r, i) {
                            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
                            return a
                        }

                        function Ce(e, t, n, r, i, o) {
                            return r && !r[b] && (r = Ce(r)), i && !i[b] && (i = Ce(i, o)), le((function(o, a, s, u) {
                                var l, c, f, d = [],
                                    p = [],
                                    h = a.length,
                                    g = o || function(e, t, n) {
                                        for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                                        return n
                                    }(t || "*", s.nodeType ? [s] : s, []),
                                    v = !e || !o && t ? g : Te(g, d, e, s, u),
                                    m = n ? i || (o ? e : h || r) ? [] : a : v;
                                if (n && n(v, m, s, u), r)
                                    for (l = Te(m, p), r(l, [], s, u), c = l.length; c--;)(f = l[c]) && (m[p[c]] = !(v[p[c]] = f));
                                if (o) {
                                    if (i || e) {
                                        if (i) {
                                            for (l = [], c = m.length; c--;)(f = m[c]) && l.push(v[c] = f);
                                            i(null, m = [], l, u)
                                        }
                                        for (c = m.length; c--;)(f = m[c]) && -1 < (l = i ? P(o, f) : d[c]) && (o[l] = !(a[l] = f))
                                    }
                                } else m = Te(m === a ? m.splice(h, m.length) : m), i ? i(null, a, m, u) : H.apply(a, m)
                            }))
                        }

                        function ke(e) {
                            for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = be((function(e) {
                                    return e === t
                                }), s, !0), f = be((function(e) {
                                    return -1 < P(t, e)
                                }), s, !0), d = [function(e, n, r) {
                                    var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
                                    return t = null, i
                                }]; u < o; u++)
                                if (n = r.relative[e[u].type]) d = [be(we(d), n)];
                                else {
                                    if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                                        for (i = ++u; i < o && !r.relative[e[i].type]; i++);
                                        return Ce(1 < u && we(d), 1 < u && xe(e.slice(0, u - 1).concat({
                                            value: " " === e[u - 2].type ? "*" : ""
                                        })).replace(W, "$1"), n, u < i && ke(e.slice(u, i)), i < o && ke(e = e.slice(i)), i < o && xe(e))
                                    }
                                    d.push(n)
                                }
                            return we(d)
                        }
                        return ye.prototype = r.filters = r.pseudos, r.setFilters = new ye, a = se.tokenize = function(e, t) {
                            var n, i, o, a, s, u, l, c = E[e + " "];
                            if (c) return t ? 0 : c.slice(0);
                            for (s = e, u = [], l = r.preFilter; s;) {
                                for (a in n && !(i = B.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = z.exec(s)) && (n = i.shift(), o.push({
                                        value: n,
                                        type: i[0].replace(W, " ")
                                    }), s = s.slice(n.length)), r.filter) !(i = G[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({
                                    value: n,
                                    type: a,
                                    matches: i
                                }), s = s.slice(n.length));
                                if (!n) break
                            }
                            return t ? s.length : s ? se.error(e) : E(e, u).slice(0)
                        }, s = se.compile = function(e, t) {
                            var n, i, o, s, u, c, f = [],
                                h = [],
                                v = S[e + " "];
                            if (!v) {
                                for (t || (t = a(e)), n = t.length; n--;)(v = ke(t[n]))[b] ? f.push(v) : h.push(v);
                                (v = S(e, (i = h, s = 0 < (o = f).length, u = 0 < i.length, c = function(e, t, n, a, c) {
                                    var f, h, v, m = 0,
                                        y = "0",
                                        x = e && [],
                                        b = [],
                                        w = l,
                                        C = e || u && r.find.TAG("*", c),
                                        k = T += null == w ? 1 : Math.random() || .1,
                                        E = C.length;
                                    for (c && (l = t == p || t || c); y !== E && null != (f = C[y]); y++) {
                                        if (u && f) {
                                            for (h = 0, t || f.ownerDocument == p || (d(f), n = !g); v = i[h++];)
                                                if (v(f, t || p, n)) {
                                                    a.push(f);
                                                    break
                                                }
                                            c && (T = k)
                                        }
                                        s && ((f = !v && f) && m--, e && x.push(f))
                                    }
                                    if (m += y, s && y !== m) {
                                        for (h = 0; v = o[h++];) v(x, b, t, n);
                                        if (e) {
                                            if (0 < m)
                                                for (; y--;) x[y] || b[y] || (b[y] = L.call(a));
                                            b = Te(b)
                                        }
                                        H.apply(a, b), c && !e && 0 < b.length && 1 < m + o.length && se.uniqueSort(a)
                                    }
                                    return c && (T = k, l = w), x
                                }, s ? le(c) : c))).selector = e
                            }
                            return v
                        }, u = se.select = function(e, t, n, i) {
                            var o, u, l, c, f, d = "function" == typeof e && e,
                                p = !i && a(e = d.selector || e);
                            if (n = n || [], 1 === p.length) {
                                if (2 < (u = p[0] = p[0].slice(0)).length && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
                                    if (!(t = (r.find.ID(l.matches[0].replace(te, ne), t) || [])[0])) return n;
                                    d && (t = t.parentNode), e = e.slice(u.shift().value.length)
                                }
                                for (o = G.needsContext.test(e) ? 0 : u.length; o-- && (l = u[o], !r.relative[c = l.type]);)
                                    if ((f = r.find[c]) && (i = f(l.matches[0].replace(te, ne), ee.test(u[0].type) && me(t.parentNode) || t))) {
                                        if (u.splice(o, 1), !(e = i.length && xe(u))) return H.apply(n, i), n;
                                        break
                                    }
                            }
                            return (d || s(e, p))(i, t, !g, n, !t || ee.test(e) && me(t.parentNode) || t), n
                        }, n.sortStable = b.split("").sort(N).join("") === b, n.detectDuplicates = !!f, d(), n.sortDetached = ce((function(e) {
                            return 1 & e.compareDocumentPosition(p.createElement("fieldset"))
                        })), ce((function(e) {
                            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                        })) || fe("type|href|height|width", (function(e, t, n) {
                            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                        })), n.attributes && ce((function(e) {
                            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                        })) || fe("value", (function(e, t, n) {
                            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                        })), ce((function(e) {
                            return null == e.getAttribute("disabled")
                        })) || fe(_, (function(e, t, n) {
                            var r;
                            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                        })), se
                    }(r);
                    k.find = S, k.expr = S.selectors, k.expr[":"] = k.expr.pseudos, k.uniqueSort = k.unique = S.uniqueSort, k.text = S.getText, k.isXMLDoc = S.isXML, k.contains = S.contains, k.escapeSelector = S.escape;
                    var A = function(e, t, n) {
                            for (var r = [], i = void 0 !== n;
                                (e = e[t]) && 9 !== e.nodeType;)
                                if (1 === e.nodeType) {
                                    if (i && k(e).is(n)) break;
                                    r.push(e)
                                }
                            return r
                        },
                        N = function(e, t) {
                            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                            return n
                        },
                        D = k.expr.match.needsContext;

                    function j(e, t) {
                        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                    }
                    var L = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

                    function q(e, t, n) {
                        return m(t) ? k.grep(e, (function(e, r) {
                            return !!t.call(e, r, e) !== n
                        })) : t.nodeType ? k.grep(e, (function(e) {
                            return e === t !== n
                        })) : "string" != typeof t ? k.grep(e, (function(e) {
                            return -1 < c.call(t, e) !== n
                        })) : k.filter(t, e, n)
                    }
                    k.filter = function(e, t, n) {
                        var r = t[0];
                        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? k.find.matchesSelector(r, e) ? [r] : [] : k.find.matches(e, k.grep(t, (function(e) {
                            return 1 === e.nodeType
                        })))
                    }, k.fn.extend({
                        find: function(e) {
                            var t, n, r = this.length,
                                i = this;
                            if ("string" != typeof e) return this.pushStack(k(e).filter((function() {
                                for (t = 0; t < r; t++)
                                    if (k.contains(i[t], this)) return !0
                            })));
                            for (n = this.pushStack([]), t = 0; t < r; t++) k.find(e, i[t], n);
                            return 1 < r ? k.uniqueSort(n) : n
                        },
                        filter: function(e) {
                            return this.pushStack(q(this, e || [], !1))
                        },
                        not: function(e) {
                            return this.pushStack(q(this, e || [], !0))
                        },
                        is: function(e) {
                            return !!q(this, "string" == typeof e && D.test(e) ? k(e) : e || [], !1).length
                        }
                    });
                    var H, O = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
                    (k.fn.init = function(e, t, n) {
                        var r, i;
                        if (!e) return this;
                        if (n = n || H, "string" == typeof e) {
                            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : O.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                            if (r[1]) {
                                if (t = t instanceof k ? t[0] : t, k.merge(this, k.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : x, !0)), L.test(r[1]) && k.isPlainObject(t))
                                    for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                                return this
                            }
                            return (i = x.getElementById(r[2])) && (this[0] = i, this.length = 1), this
                        }
                        return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(k) : k.makeArray(e, this)
                    }).prototype = k.fn, H = k(x);
                    var P = /^(?:parents|prev(?:Until|All))/,
                        _ = {
                            children: !0,
                            contents: !0,
                            next: !0,
                            prev: !0
                        };

                    function R(e, t) {
                        for (;
                            (e = e[t]) && 1 !== e.nodeType;);
                        return e
                    }
                    k.fn.extend({
                        has: function(e) {
                            var t = k(e, this),
                                n = t.length;
                            return this.filter((function() {
                                for (var e = 0; e < n; e++)
                                    if (k.contains(this, t[e])) return !0
                            }))
                        },
                        closest: function(e, t) {
                            var n, r = 0,
                                i = this.length,
                                o = [],
                                a = "string" != typeof e && k(e);
                            if (!D.test(e))
                                for (; r < i; r++)
                                    for (n = this[r]; n && n !== t; n = n.parentNode)
                                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && k.find.matchesSelector(n, e))) {
                                            o.push(n);
                                            break
                                        }
                            return this.pushStack(1 < o.length ? k.uniqueSort(o) : o)
                        },
                        index: function(e) {
                            return e ? "string" == typeof e ? c.call(k(e), this[0]) : c.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                        },
                        add: function(e, t) {
                            return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))))
                        },
                        addBack: function(e) {
                            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                        }
                    }), k.each({
                        parent: function(e) {
                            var t = e.parentNode;
                            return t && 11 !== t.nodeType ? t : null
                        },
                        parents: function(e) {
                            return A(e, "parentNode")
                        },
                        parentsUntil: function(e, t, n) {
                            return A(e, "parentNode", n)
                        },
                        next: function(e) {
                            return R(e, "nextSibling")
                        },
                        prev: function(e) {
                            return R(e, "previousSibling")
                        },
                        nextAll: function(e) {
                            return A(e, "nextSibling")
                        },
                        prevAll: function(e) {
                            return A(e, "previousSibling")
                        },
                        nextUntil: function(e, t, n) {
                            return A(e, "nextSibling", n)
                        },
                        prevUntil: function(e, t, n) {
                            return A(e, "previousSibling", n)
                        },
                        siblings: function(e) {
                            return N((e.parentNode || {}).firstChild, e)
                        },
                        children: function(e) {
                            return N(e.firstChild)
                        },
                        contents: function(e) {
                            return null != e.contentDocument && a(e.contentDocument) ? e.contentDocument : (j(e, "template") && (e = e.content || e), k.merge([], e.childNodes))
                        }
                    }, (function(e, t) {
                        k.fn[e] = function(n, r) {
                            var i = k.map(this, t, n);
                            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = k.filter(r, i)), 1 < this.length && (_[e] || k.uniqueSort(i), P.test(e) && i.reverse()), this.pushStack(i)
                        }
                    }));
                    var F = /[^\x20\t\r\n\f]+/g;

                    function M(e) {
                        return e
                    }

                    function I(e) {
                        throw e
                    }

                    function $(e, t, n, r) {
                        var i;
                        try {
                            e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
                        } catch (e) {
                            n.apply(void 0, [e])
                        }
                    }
                    k.Callbacks = function(e) {
                        var t, n;
                        e = "string" == typeof e ? (t = e, n = {}, k.each(t.match(F) || [], (function(e, t) {
                            n[t] = !0
                        })), n) : k.extend({}, e);
                        var r, i, o, a, s = [],
                            u = [],
                            l = -1,
                            c = function() {
                                for (a = a || e.once, o = r = !0; u.length; l = -1)
                                    for (i = u.shift(); ++l < s.length;) !1 === s[l].apply(i[0], i[1]) && e.stopOnFalse && (l = s.length, i = !1);
                                e.memory || (i = !1), r = !1, a && (s = i ? [] : "")
                            },
                            f = {
                                add: function() {
                                    return s && (i && !r && (l = s.length - 1, u.push(i)), function t(n) {
                                        k.each(n, (function(n, r) {
                                            m(r) ? e.unique && f.has(r) || s.push(r) : r && r.length && "string" !== T(r) && t(r)
                                        }))
                                    }(arguments), i && !r && c()), this
                                },
                                remove: function() {
                                    return k.each(arguments, (function(e, t) {
                                        for (var n; - 1 < (n = k.inArray(t, s, n));) s.splice(n, 1), n <= l && l--
                                    })), this
                                },
                                has: function(e) {
                                    return e ? -1 < k.inArray(e, s) : 0 < s.length
                                },
                                empty: function() {
                                    return s && (s = []), this
                                },
                                disable: function() {
                                    return a = u = [], s = i = "", this
                                },
                                disabled: function() {
                                    return !s
                                },
                                lock: function() {
                                    return a = u = [], i || r || (s = i = ""), this
                                },
                                locked: function() {
                                    return !!a
                                },
                                fireWith: function(e, t) {
                                    return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), r || c()), this
                                },
                                fire: function() {
                                    return f.fireWith(this, arguments), this
                                },
                                fired: function() {
                                    return !!o
                                }
                            };
                        return f
                    }, k.extend({
                        Deferred: function(e) {
                            var t = [
                                    ["notify", "progress", k.Callbacks("memory"), k.Callbacks("memory"), 2],
                                    ["resolve", "done", k.Callbacks("once memory"), k.Callbacks("once memory"), 0, "resolved"],
                                    ["reject", "fail", k.Callbacks("once memory"), k.Callbacks("once memory"), 1, "rejected"]
                                ],
                                n = "pending",
                                i = {
                                    state: function() {
                                        return n
                                    },
                                    always: function() {
                                        return o.done(arguments).fail(arguments), this
                                    },
                                    catch: function(e) {
                                        return i.then(null, e)
                                    },
                                    pipe: function() {
                                        var e = arguments;
                                        return k.Deferred((function(n) {
                                            k.each(t, (function(t, r) {
                                                var i = m(e[r[4]]) && e[r[4]];
                                                o[r[1]]((function() {
                                                    var e = i && i.apply(this, arguments);
                                                    e && m(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this, i ? [e] : arguments)
                                                }))
                                            })), e = null
                                        })).promise()
                                    },
                                    then: function(e, n, i) {
                                        var o = 0;

                                        function a(e, t, n, i) {
                                            return function() {
                                                var s = this,
                                                    u = arguments,
                                                    l = function() {
                                                        var r, l;
                                                        if (!(e < o)) {
                                                            if ((r = n.apply(s, u)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                                            l = r && ("object" == typeof r || "function" == typeof r) && r.then, m(l) ? i ? l.call(r, a(o, t, M, i), a(o, t, I, i)) : (o++, l.call(r, a(o, t, M, i), a(o, t, I, i), a(o, t, M, t.notifyWith))) : (n !== M && (s = void 0, u = [r]), (i || t.resolveWith)(s, u))
                                                        }
                                                    },
                                                    c = i ? l : function() {
                                                        try {
                                                            l()
                                                        } catch (r) {
                                                            k.Deferred.exceptionHook && k.Deferred.exceptionHook(r, c.stackTrace), o <= e + 1 && (n !== I && (s = void 0, u = [r]), t.rejectWith(s, u))
                                                        }
                                                    };
                                                e ? c() : (k.Deferred.getStackHook && (c.stackTrace = k.Deferred.getStackHook()), r.setTimeout(c))
                                            }
                                        }
                                        return k.Deferred((function(r) {
                                            t[0][3].add(a(0, r, m(i) ? i : M, r.notifyWith)), t[1][3].add(a(0, r, m(e) ? e : M)), t[2][3].add(a(0, r, m(n) ? n : I))
                                        })).promise()
                                    },
                                    promise: function(e) {
                                        return null != e ? k.extend(e, i) : i
                                    }
                                },
                                o = {};
                            return k.each(t, (function(e, r) {
                                var a = r[2],
                                    s = r[5];
                                i[r[1]] = a.add, s && a.add((function() {
                                    n = s
                                }), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), a.add(r[3].fire), o[r[0]] = function() {
                                    return o[r[0] + "With"](this === o ? void 0 : this, arguments), this
                                }, o[r[0] + "With"] = a.fireWith
                            })), i.promise(o), e && e.call(o, o), o
                        },
                        when: function(e) {
                            var t = arguments.length,
                                n = t,
                                r = Array(n),
                                i = s.call(arguments),
                                o = k.Deferred(),
                                a = function(e) {
                                    return function(n) {
                                        r[e] = this, i[e] = 1 < arguments.length ? s.call(arguments) : n, --t || o.resolveWith(r, i)
                                    }
                                };
                            if (t <= 1 && ($(e, o.done(a(n)).resolve, o.reject, !t), "pending" === o.state() || m(i[n] && i[n].then))) return o.then();
                            for (; n--;) $(i[n], a(n), o.reject);
                            return o.promise()
                        }
                    });
                    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                    k.Deferred.exceptionHook = function(e, t) {
                        r.console && r.console.warn && e && W.test(e.name) && r.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
                    }, k.readyException = function(e) {
                        r.setTimeout((function() {
                            throw e
                        }))
                    };
                    var B = k.Deferred();

                    function z() {
                        x.removeEventListener("DOMContentLoaded", z), r.removeEventListener("load", z), k.ready()
                    }
                    k.fn.ready = function(e) {
                        return B.then(e).catch((function(e) {
                            k.readyException(e)
                        })), this
                    }, k.extend({
                        isReady: !1,
                        readyWait: 1,
                        ready: function(e) {
                            (!0 === e ? --k.readyWait : k.isReady) || (k.isReady = !0) !== e && 0 < --k.readyWait || B.resolveWith(x, [k])
                        }
                    }), k.ready.then = B.then, "complete" === x.readyState || "loading" !== x.readyState && !x.documentElement.doScroll ? r.setTimeout(k.ready) : (x.addEventListener("DOMContentLoaded", z), r.addEventListener("load", z));
                    var U = function(e, t, n, r, i, o, a) {
                            var s = 0,
                                u = e.length,
                                l = null == n;
                            if ("object" === T(n))
                                for (s in i = !0, n) U(e, t, s, n[s], !0, o, a);
                            else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                                    return l.call(k(e), n)
                                })), t))
                                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
                        },
                        X = /^-ms-/,
                        V = /-([a-z])/g;

                    function G(e, t) {
                        return t.toUpperCase()
                    }

                    function Y(e) {
                        return e.replace(X, "ms-").replace(V, G)
                    }
                    var Q = function(e) {
                        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                    };

                    function J() {
                        this.expando = k.expando + J.uid++
                    }
                    J.uid = 1, J.prototype = {
                        cache: function(e) {
                            var t = e[this.expando];
                            return t || (t = {}, Q(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                                value: t,
                                configurable: !0
                            }))), t
                        },
                        set: function(e, t, n) {
                            var r, i = this.cache(e);
                            if ("string" == typeof t) i[Y(t)] = n;
                            else
                                for (r in t) i[Y(r)] = t[r];
                            return i
                        },
                        get: function(e, t) {
                            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][Y(t)]
                        },
                        access: function(e, t, n) {
                            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
                        },
                        remove: function(e, t) {
                            var n, r = e[this.expando];
                            if (void 0 !== r) {
                                if (void 0 !== t) {
                                    n = (t = Array.isArray(t) ? t.map(Y) : (t = Y(t)) in r ? [t] : t.match(F) || []).length;
                                    for (; n--;) delete r[t[n]]
                                }(void 0 === t || k.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                            }
                        },
                        hasData: function(e) {
                            var t = e[this.expando];
                            return void 0 !== t && !k.isEmptyObject(t)
                        }
                    };
                    var K = new J,
                        Z = new J,
                        ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                        te = /[A-Z]/g;

                    function ne(e, t, n) {
                        var r, i;
                        if (void 0 === n && 1 === e.nodeType)
                            if (r = "data-" + t.replace(te, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                                try {
                                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : ee.test(i) ? JSON.parse(i) : i)
                                } catch (e) {}
                                Z.set(e, t, n)
                            } else n = void 0;
                        return n
                    }
                    k.extend({
                        hasData: function(e) {
                            return Z.hasData(e) || K.hasData(e)
                        },
                        data: function(e, t, n) {
                            return Z.access(e, t, n)
                        },
                        removeData: function(e, t) {
                            Z.remove(e, t)
                        },
                        _data: function(e, t, n) {
                            return K.access(e, t, n)
                        },
                        _removeData: function(e, t) {
                            K.remove(e, t)
                        }
                    }), k.fn.extend({
                        data: function(e, t) {
                            var n, r, i, o = this[0],
                                a = o && o.attributes;
                            if (void 0 === e) {
                                if (this.length && (i = Z.get(o), 1 === o.nodeType && !K.get(o, "hasDataAttrs"))) {
                                    for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = Y(r.slice(5)), ne(o, r, i[r]));
                                    K.set(o, "hasDataAttrs", !0)
                                }
                                return i
                            }
                            return "object" == typeof e ? this.each((function() {
                                Z.set(this, e)
                            })) : U(this, (function(t) {
                                var n;
                                if (o && void 0 === t) return void 0 !== (n = Z.get(o, e)) || void 0 !== (n = ne(o, e)) ? n : void 0;
                                this.each((function() {
                                    Z.set(this, e, t)
                                }))
                            }), null, t, 1 < arguments.length, null, !0)
                        },
                        removeData: function(e) {
                            return this.each((function() {
                                Z.remove(this, e)
                            }))
                        }
                    }), k.extend({
                        queue: function(e, t, n) {
                            var r;
                            if (e) return t = (t || "fx") + "queue", r = K.get(e, t), n && (!r || Array.isArray(n) ? r = K.access(e, t, k.makeArray(n)) : r.push(n)), r || []
                        },
                        dequeue: function(e, t) {
                            t = t || "fx";
                            var n = k.queue(e, t),
                                r = n.length,
                                i = n.shift(),
                                o = k._queueHooks(e, t);
                            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, (function() {
                                k.dequeue(e, t)
                            }), o)), !r && o && o.empty.fire()
                        },
                        _queueHooks: function(e, t) {
                            var n = t + "queueHooks";
                            return K.get(e, n) || K.access(e, n, {
                                empty: k.Callbacks("once memory").add((function() {
                                    K.remove(e, [t + "queue", n])
                                }))
                            })
                        }
                    }), k.fn.extend({
                        queue: function(e, t) {
                            var n = 2;
                            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? k.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                                var n = k.queue(this, e, t);
                                k._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && k.dequeue(this, e)
                            }))
                        },
                        dequeue: function(e) {
                            return this.each((function() {
                                k.dequeue(this, e)
                            }))
                        },
                        clearQueue: function(e) {
                            return this.queue(e || "fx", [])
                        },
                        promise: function(e, t) {
                            var n, r = 1,
                                i = k.Deferred(),
                                o = this,
                                a = this.length,
                                s = function() {
                                    --r || i.resolveWith(o, [o])
                                };
                            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = K.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
                            return s(), i.promise(t)
                        }
                    });
                    var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                        ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
                        oe = ["Top", "Right", "Bottom", "Left"],
                        ae = x.documentElement,
                        se = function(e) {
                            return k.contains(e.ownerDocument, e)
                        },
                        ue = {
                            composed: !0
                        };
                    ae.getRootNode && (se = function(e) {
                        return k.contains(e.ownerDocument, e) || e.getRootNode(ue) === e.ownerDocument
                    });
                    var le = function(e, t) {
                        return "none" === (e = t || e).style.display || "" === e.style.display && se(e) && "none" === k.css(e, "display")
                    };

                    function ce(e, t, n, r) {
                        var i, o, a = 20,
                            s = r ? function() {
                                return r.cur()
                            } : function() {
                                return k.css(e, t, "")
                            },
                            u = s(),
                            l = n && n[3] || (k.cssNumber[t] ? "" : "px"),
                            c = e.nodeType && (k.cssNumber[t] || "px" !== l && +u) && ie.exec(k.css(e, t));
                        if (c && c[3] !== l) {
                            for (u /= 2, l = l || c[3], c = +u || 1; a--;) k.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
                            c *= 2, k.style(e, t, c + l), n = n || []
                        }
                        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
                    }
                    var fe = {};

                    function de(e, t) {
                        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)(r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = K.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && le(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = fe[s]) || (o = a.body.appendChild(a.createElement(s)), u = k.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), fe[s] = u)))) : "none" !== n && (l[c] = "none", K.set(r, "display", n)));
                        for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
                        return e
                    }
                    k.fn.extend({
                        show: function() {
                            return de(this, !0)
                        },
                        hide: function() {
                            return de(this)
                        },
                        toggle: function(e) {
                            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                                le(this) ? k(this).show() : k(this).hide()
                            }))
                        }
                    });
                    var pe, he, ge = /^(?:checkbox|radio)$/i,
                        ve = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                        me = /^$|^module$|\/(?:java|ecma)script/i;
                    pe = x.createDocumentFragment().appendChild(x.createElement("div")), (he = x.createElement("input")).setAttribute("type", "radio"), he.setAttribute("checked", "checked"), he.setAttribute("name", "t"), pe.appendChild(he), v.checkClone = pe.cloneNode(!0).cloneNode(!0).lastChild.checked, pe.innerHTML = "<textarea>x</textarea>", v.noCloneChecked = !!pe.cloneNode(!0).lastChild.defaultValue, pe.innerHTML = "<option></option>", v.option = !!pe.lastChild;
                    var ye = {
                        thead: [1, "<table>", "</table>"],
                        col: [2, "<table><colgroup>", "</colgroup></table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        _default: [0, "", ""]
                    };

                    function xe(e, t) {
                        var n;
                        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && j(e, t) ? k.merge([e], n) : n
                    }

                    function be(e, t) {
                        for (var n = 0, r = e.length; n < r; n++) K.set(e[n], "globalEval", !t || K.get(t[n], "globalEval"))
                    }
                    ye.tbody = ye.tfoot = ye.colgroup = ye.caption = ye.thead, ye.th = ye.td, v.option || (ye.optgroup = ye.option = [1, "<select multiple='multiple'>", "</select>"]);
                    var we = /<|&#?\w+;/;

                    function Te(e, t, n, r, i) {
                        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), d = [], p = 0, h = e.length; p < h; p++)
                            if ((o = e[p]) || 0 === o)
                                if ("object" === T(o)) k.merge(d, o.nodeType ? [o] : o);
                                else if (we.test(o)) {
                            for (a = a || f.appendChild(t.createElement("div")), s = (ve.exec(o) || ["", ""])[1].toLowerCase(), u = ye[s] || ye._default, a.innerHTML = u[1] + k.htmlPrefilter(o) + u[2], c = u[0]; c--;) a = a.lastChild;
                            k.merge(d, a.childNodes), (a = f.firstChild).textContent = ""
                        } else d.push(t.createTextNode(o));
                        for (f.textContent = "", p = 0; o = d[p++];)
                            if (r && -1 < k.inArray(o, r)) i && i.push(o);
                            else if (l = se(o), a = xe(f.appendChild(o), "script"), l && be(a), n)
                            for (c = 0; o = a[c++];) me.test(o.type || "") && n.push(o);
                        return f
                    }
                    var Ce = /^([^.]*)(?:\.(.+)|)/;

                    function ke() {
                        return !0
                    }

                    function Ee() {
                        return !1
                    }

                    function Se(e, t) {
                        return e === function() {
                            try {
                                return x.activeElement
                            } catch (e) {}
                        }() == ("focus" === t)
                    }

                    function Ae(e, t, n, r, i, o) {
                        var a, s;
                        if ("object" == typeof t) {
                            for (s in "string" != typeof n && (r = r || n, n = void 0), t) Ae(e, s, n, r, t[s], o);
                            return e
                        }
                        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Ee;
                        else if (!i) return e;
                        return 1 === o && (a = i, (i = function(e) {
                            return k().off(e), a.apply(this, arguments)
                        }).guid = a.guid || (a.guid = k.guid++)), e.each((function() {
                            k.event.add(this, t, i, r, n)
                        }))
                    }

                    function Ne(e, t, n) {
                        n ? (K.set(e, t, !1), k.event.add(e, t, {
                            namespace: !1,
                            handler: function(e) {
                                var r, i, o = K.get(this, t);
                                if (1 & e.isTrigger && this[t]) {
                                    if (o.length)(k.event.special[t] || {}).delegateType && e.stopPropagation();
                                    else if (o = s.call(arguments), K.set(this, t, o), r = n(this, t), this[t](), o !== (i = K.get(this, t)) || r ? K.set(this, t, !1) : i = {}, o !== i) return e.stopImmediatePropagation(), e.preventDefault(), i && i.value
                                } else o.length && (K.set(this, t, {
                                    value: k.event.trigger(k.extend(o[0], k.Event.prototype), o.slice(1), this)
                                }), e.stopImmediatePropagation())
                            }
                        })) : void 0 === K.get(e, t) && k.event.add(e, t, ke)
                    }
                    k.event = {
                        global: {},
                        add: function(e, t, n, r, i) {
                            var o, a, s, u, l, c, f, d, p, h, g, v = K.get(e);
                            if (Q(e))
                                for (n.handler && (n = (o = n).handler, i = o.selector), i && k.find.matchesSelector(ae, i), n.guid || (n.guid = k.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function(t) {
                                        return void 0 !== k && k.event.triggered !== t.type ? k.event.dispatch.apply(e, arguments) : void 0
                                    }), l = (t = (t || "").match(F) || [""]).length; l--;) p = g = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p && (f = k.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = k.event.special[p] || {}, c = k.extend({
                                    type: p,
                                    origType: g,
                                    data: r,
                                    handler: n,
                                    guid: n.guid,
                                    selector: i,
                                    needsContext: i && k.expr.match.needsContext.test(i),
                                    namespace: h.join(".")
                                }, o), (d = u[p]) || ((d = u[p] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(p, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, c) : d.push(c), k.event.global[p] = !0)
                        },
                        remove: function(e, t, n, r, i) {
                            var o, a, s, u, l, c, f, d, p, h, g, v = K.hasData(e) && K.get(e);
                            if (v && (u = v.events)) {
                                for (l = (t = (t || "").match(F) || [""]).length; l--;)
                                    if (p = g = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                                        for (f = k.event.special[p] || {}, d = u[p = (r ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) c = d[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, f.remove && f.remove.call(e, c));
                                        a && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || k.removeEvent(e, p, v.handle), delete u[p])
                                    } else
                                        for (p in u) k.event.remove(e, p + t[l], n, r, !0);
                                k.isEmptyObject(u) && K.remove(e, "handle events")
                            }
                        },
                        dispatch: function(e) {
                            var t, n, r, i, o, a, s = new Array(arguments.length),
                                u = k.event.fix(e),
                                l = (K.get(this, "events") || Object.create(null))[u.type] || [],
                                c = k.event.special[u.type] || {};
                            for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
                            if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                                for (a = k.event.handlers.call(this, u, l), t = 0;
                                    (i = a[t++]) && !u.isPropagationStopped();)
                                    for (u.currentTarget = i.elem, n = 0;
                                        (o = i.handlers[n++]) && !u.isImmediatePropagationStopped();) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((k.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
                                return c.postDispatch && c.postDispatch.call(this, u), u.result
                            }
                        },
                        handlers: function(e, t) {
                            var n, r, i, o, a, s = [],
                                u = t.delegateCount,
                                l = e.target;
                            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                                for (; l !== this; l = l.parentNode || this)
                                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                                        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < k(i, this).index(l) : k.find(i, this, null, [l]).length), a[i] && o.push(r);
                                        o.length && s.push({
                                            elem: l,
                                            handlers: o
                                        })
                                    }
                            return l = this, u < t.length && s.push({
                                elem: l,
                                handlers: t.slice(u)
                            }), s
                        },
                        addProp: function(e, t) {
                            Object.defineProperty(k.Event.prototype, e, {
                                enumerable: !0,
                                configurable: !0,
                                get: m(t) ? function() {
                                    if (this.originalEvent) return t(this.originalEvent)
                                } : function() {
                                    if (this.originalEvent) return this.originalEvent[e]
                                },
                                set: function(t) {
                                    Object.defineProperty(this, e, {
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: t
                                    })
                                }
                            })
                        },
                        fix: function(e) {
                            return e[k.expando] ? e : new k.Event(e)
                        },
                        special: {
                            load: {
                                noBubble: !0
                            },
                            click: {
                                setup: function(e) {
                                    var t = this || e;
                                    return ge.test(t.type) && t.click && j(t, "input") && Ne(t, "click", ke), !1
                                },
                                trigger: function(e) {
                                    var t = this || e;
                                    return ge.test(t.type) && t.click && j(t, "input") && Ne(t, "click"), !0
                                },
                                _default: function(e) {
                                    var t = e.target;
                                    return ge.test(t.type) && t.click && j(t, "input") && K.get(t, "click") || j(t, "a")
                                }
                            },
                            beforeunload: {
                                postDispatch: function(e) {
                                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                                }
                            }
                        }
                    }, k.removeEvent = function(e, t, n) {
                        e.removeEventListener && e.removeEventListener(t, n)
                    }, k.Event = function(e, t) {
                        if (!(this instanceof k.Event)) return new k.Event(e, t);
                        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? ke : Ee, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && k.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[k.expando] = !0
                    }, k.Event.prototype = {
                        constructor: k.Event,
                        isDefaultPrevented: Ee,
                        isPropagationStopped: Ee,
                        isImmediatePropagationStopped: Ee,
                        isSimulated: !1,
                        preventDefault: function() {
                            var e = this.originalEvent;
                            this.isDefaultPrevented = ke, e && !this.isSimulated && e.preventDefault()
                        },
                        stopPropagation: function() {
                            var e = this.originalEvent;
                            this.isPropagationStopped = ke, e && !this.isSimulated && e.stopPropagation()
                        },
                        stopImmediatePropagation: function() {
                            var e = this.originalEvent;
                            this.isImmediatePropagationStopped = ke, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                        }
                    }, k.each({
                        altKey: !0,
                        bubbles: !0,
                        cancelable: !0,
                        changedTouches: !0,
                        ctrlKey: !0,
                        detail: !0,
                        eventPhase: !0,
                        metaKey: !0,
                        pageX: !0,
                        pageY: !0,
                        shiftKey: !0,
                        view: !0,
                        char: !0,
                        code: !0,
                        charCode: !0,
                        key: !0,
                        keyCode: !0,
                        button: !0,
                        buttons: !0,
                        clientX: !0,
                        clientY: !0,
                        offsetX: !0,
                        offsetY: !0,
                        pointerId: !0,
                        pointerType: !0,
                        screenX: !0,
                        screenY: !0,
                        targetTouches: !0,
                        toElement: !0,
                        touches: !0,
                        which: !0
                    }, k.event.addProp), k.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, (function(e, t) {
                        k.event.special[e] = {
                            setup: function() {
                                return Ne(this, e, Se), !1
                            },
                            trigger: function() {
                                return Ne(this, e), !0
                            },
                            _default: function() {
                                return !0
                            },
                            delegateType: t
                        }
                    })), k.each({
                        mouseenter: "mouseover",
                        mouseleave: "mouseout",
                        pointerenter: "pointerover",
                        pointerleave: "pointerout"
                    }, (function(e, t) {
                        k.event.special[e] = {
                            delegateType: t,
                            bindType: t,
                            handle: function(e) {
                                var n, r = e.relatedTarget,
                                    i = e.handleObj;
                                return r && (r === this || k.contains(this, r)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
                            }
                        }
                    })), k.fn.extend({
                        on: function(e, t, n, r) {
                            return Ae(this, e, t, n, r)
                        },
                        one: function(e, t, n, r) {
                            return Ae(this, e, t, n, r, 1)
                        },
                        off: function(e, t, n) {
                            var r, i;
                            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, k(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                            if ("object" == typeof e) {
                                for (i in e) this.off(i, t, e[i]);
                                return this
                            }
                            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Ee), this.each((function() {
                                k.event.remove(this, e, n, t)
                            }))
                        }
                    });
                    var De = /<script|<style|<link/i,
                        je = /checked\s*(?:[^=]|=\s*.checked.)/i,
                        Le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                    function qe(e, t) {
                        return j(e, "table") && j(11 !== t.nodeType ? t : t.firstChild, "tr") && k(e).children("tbody")[0] || e
                    }

                    function He(e) {
                        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
                    }

                    function Oe(e) {
                        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
                    }

                    function Pe(e, t) {
                        var n, r, i, o, a, s;
                        if (1 === t.nodeType) {
                            if (K.hasData(e) && (s = K.get(e).events))
                                for (i in K.remove(t, "handle events"), s)
                                    for (n = 0, r = s[i].length; n < r; n++) k.event.add(t, i, s[i][n]);
                            Z.hasData(e) && (o = Z.access(e), a = k.extend({}, o), Z.set(t, a))
                        }
                    }

                    function _e(e, t, n, r) {
                        t = u(t);
                        var i, o, a, s, l, c, f = 0,
                            d = e.length,
                            p = d - 1,
                            h = t[0],
                            g = m(h);
                        if (g || 1 < d && "string" == typeof h && !v.checkClone && je.test(h)) return e.each((function(i) {
                            var o = e.eq(i);
                            g && (t[0] = h.call(this, i, o.html())), _e(o, t, n, r)
                        }));
                        if (d && (o = (i = Te(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
                            for (s = (a = k.map(xe(i, "script"), He)).length; f < d; f++) l = i, f !== p && (l = k.clone(l, !0, !0), s && k.merge(a, xe(l, "script"))), n.call(e[f], l, f);
                            if (s)
                                for (c = a[a.length - 1].ownerDocument, k.map(a, Oe), f = 0; f < s; f++) l = a[f], me.test(l.type || "") && !K.access(l, "globalEval") && k.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? k._evalUrl && !l.noModule && k._evalUrl(l.src, {
                                    nonce: l.nonce || l.getAttribute("nonce")
                                }, c) : w(l.textContent.replace(Le, ""), l, c))
                        }
                        return e
                    }

                    function Re(e, t, n) {
                        for (var r, i = t ? k.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || k.cleanData(xe(r)), r.parentNode && (n && se(r) && be(xe(r, "script")), r.parentNode.removeChild(r));
                        return e
                    }
                    k.extend({
                        htmlPrefilter: function(e) {
                            return e
                        },
                        clone: function(e, t, n) {
                            var r, i, o, a, s, u, l, c = e.cloneNode(!0),
                                f = se(e);
                            if (!(v.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || k.isXMLDoc(e)))
                                for (a = xe(c), r = 0, i = (o = xe(e)).length; r < i; r++) s = o[r], "input" === (l = (u = a[r]).nodeName.toLowerCase()) && ge.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
                            if (t)
                                if (n)
                                    for (o = o || xe(e), a = a || xe(c), r = 0, i = o.length; r < i; r++) Pe(o[r], a[r]);
                                else Pe(e, c);
                            return 0 < (a = xe(c, "script")).length && be(a, !f && xe(e, "script")), c
                        },
                        cleanData: function(e) {
                            for (var t, n, r, i = k.event.special, o = 0; void 0 !== (n = e[o]); o++)
                                if (Q(n)) {
                                    if (t = n[K.expando]) {
                                        if (t.events)
                                            for (r in t.events) i[r] ? k.event.remove(n, r) : k.removeEvent(n, r, t.handle);
                                        n[K.expando] = void 0
                                    }
                                    n[Z.expando] && (n[Z.expando] = void 0)
                                }
                        }
                    }), k.fn.extend({
                        detach: function(e) {
                            return Re(this, e, !0)
                        },
                        remove: function(e) {
                            return Re(this, e)
                        },
                        text: function(e) {
                            return U(this, (function(e) {
                                return void 0 === e ? k.text(this) : this.empty().each((function() {
                                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                                }))
                            }), null, e, arguments.length)
                        },
                        append: function() {
                            return _e(this, arguments, (function(e) {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e).appendChild(e)
                            }))
                        },
                        prepend: function() {
                            return _e(this, arguments, (function(e) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var t = qe(this, e);
                                    t.insertBefore(e, t.firstChild)
                                }
                            }))
                        },
                        before: function() {
                            return _e(this, arguments, (function(e) {
                                this.parentNode && this.parentNode.insertBefore(e, this)
                            }))
                        },
                        after: function() {
                            return _e(this, arguments, (function(e) {
                                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                            }))
                        },
                        empty: function() {
                            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (k.cleanData(xe(e, !1)), e.textContent = "");
                            return this
                        },
                        clone: function(e, t) {
                            return e = null != e && e, t = null == t ? e : t, this.map((function() {
                                return k.clone(this, e, t)
                            }))
                        },
                        html: function(e) {
                            return U(this, (function(e) {
                                var t = this[0] || {},
                                    n = 0,
                                    r = this.length;
                                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                                if ("string" == typeof e && !De.test(e) && !ye[(ve.exec(e) || ["", ""])[1].toLowerCase()]) {
                                    e = k.htmlPrefilter(e);
                                    try {
                                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (k.cleanData(xe(t, !1)), t.innerHTML = e);
                                        t = 0
                                    } catch (e) {}
                                }
                                t && this.empty().append(e)
                            }), null, e, arguments.length)
                        },
                        replaceWith: function() {
                            var e = [];
                            return _e(this, arguments, (function(t) {
                                var n = this.parentNode;
                                k.inArray(this, e) < 0 && (k.cleanData(xe(this)), n && n.replaceChild(t, this))
                            }), e)
                        }
                    }), k.each({
                        appendTo: "append",
                        prependTo: "prepend",
                        insertBefore: "before",
                        insertAfter: "after",
                        replaceAll: "replaceWith"
                    }, (function(e, t) {
                        k.fn[e] = function(e) {
                            for (var n, r = [], i = k(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), k(i[a])[t](n), l.apply(r, n.get());
                            return this.pushStack(r)
                        }
                    }));
                    var Fe = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
                        Me = function(e) {
                            var t = e.ownerDocument.defaultView;
                            return t && t.opener || (t = r), t.getComputedStyle(e)
                        },
                        Ie = function(e, t, n) {
                            var r, i, o = {};
                            for (i in t) o[i] = e.style[i], e.style[i] = t[i];
                            for (i in r = n.call(e), t) e.style[i] = o[i];
                            return r
                        },
                        $e = new RegExp(oe.join("|"), "i");

                    function We(e, t, n) {
                        var r, i, o, a, s = e.style;
                        return (n = n || Me(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || se(e) || (a = k.style(e, t)), !v.pixelBoxStyles() && Fe.test(a) && $e.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
                    }

                    function Be(e, t) {
                        return {
                            get: function() {
                                if (!e()) return (this.get = t).apply(this, arguments);
                                delete this.get
                            }
                        }
                    }! function() {
                        function e() {
                            if (c) {
                                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ae.appendChild(l).appendChild(c);
                                var e = r.getComputedStyle(c);
                                n = "1%" !== e.top, u = 12 === t(e.marginLeft), c.style.right = "60%", a = 36 === t(e.right), i = 36 === t(e.width), c.style.position = "absolute", o = 12 === t(c.offsetWidth / 3), ae.removeChild(l), c = null
                            }
                        }

                        function t(e) {
                            return Math.round(parseFloat(e))
                        }
                        var n, i, o, a, s, u, l = x.createElement("div"),
                            c = x.createElement("div");
                        c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", v.clearCloneStyle = "content-box" === c.style.backgroundClip, k.extend(v, {
                            boxSizingReliable: function() {
                                return e(), i
                            },
                            pixelBoxStyles: function() {
                                return e(), a
                            },
                            pixelPosition: function() {
                                return e(), n
                            },
                            reliableMarginLeft: function() {
                                return e(), u
                            },
                            scrollboxSize: function() {
                                return e(), o
                            },
                            reliableTrDimensions: function() {
                                var e, t, n, i;
                                return null == s && (e = x.createElement("table"), t = x.createElement("tr"), n = x.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", ae.appendChild(e).appendChild(t).appendChild(n), i = r.getComputedStyle(t), s = parseInt(i.height, 10) + parseInt(i.borderTopWidth, 10) + parseInt(i.borderBottomWidth, 10) === t.offsetHeight, ae.removeChild(e)), s
                            }
                        }))
                    }();
                    var ze = ["Webkit", "Moz", "ms"],
                        Ue = x.createElement("div").style,
                        Xe = {};

                    function Ve(e) {
                        return k.cssProps[e] || Xe[e] || (e in Ue ? e : Xe[e] = function(e) {
                            for (var t = e[0].toUpperCase() + e.slice(1), n = ze.length; n--;)
                                if ((e = ze[n] + t) in Ue) return e
                        }(e) || e)
                    }
                    var Ge = /^(none|table(?!-c[ea]).+)/,
                        Ye = /^--/,
                        Qe = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        Je = {
                            letterSpacing: "0",
                            fontWeight: "400"
                        };

                    function Ke(e, t, n) {
                        var r = ie.exec(t);
                        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
                    }

                    function Ze(e, t, n, r, i, o) {
                        var a = "width" === t ? 1 : 0,
                            s = 0,
                            u = 0;
                        if (n === (r ? "border" : "content")) return 0;
                        for (; a < 4; a += 2) "margin" === n && (u += k.css(e, n + oe[a], !0, i)), r ? ("content" === n && (u -= k.css(e, "padding" + oe[a], !0, i)), "margin" !== n && (u -= k.css(e, "border" + oe[a] + "Width", !0, i))) : (u += k.css(e, "padding" + oe[a], !0, i), "padding" !== n ? u += k.css(e, "border" + oe[a] + "Width", !0, i) : s += k.css(e, "border" + oe[a] + "Width", !0, i));
                        return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u
                    }

                    function et(e, t, n) {
                        var r = Me(e),
                            i = (!v.boxSizingReliable() || n) && "border-box" === k.css(e, "boxSizing", !1, r),
                            o = i,
                            a = We(e, t, r),
                            s = "offset" + t[0].toUpperCase() + t.slice(1);
                        if (Fe.test(a)) {
                            if (!n) return a;
                            a = "auto"
                        }
                        return (!v.boxSizingReliable() && i || !v.reliableTrDimensions() && j(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === k.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === k.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Ze(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
                    }

                    function tt(e, t, n, r, i) {
                        return new tt.prototype.init(e, t, n, r, i)
                    }
                    k.extend({
                        cssHooks: {
                            opacity: {
                                get: function(e, t) {
                                    if (t) {
                                        var n = We(e, "opacity");
                                        return "" === n ? "1" : n
                                    }
                                }
                            }
                        },
                        cssNumber: {
                            animationIterationCount: !0,
                            columnCount: !0,
                            fillOpacity: !0,
                            flexGrow: !0,
                            flexShrink: !0,
                            fontWeight: !0,
                            gridArea: !0,
                            gridColumn: !0,
                            gridColumnEnd: !0,
                            gridColumnStart: !0,
                            gridRow: !0,
                            gridRowEnd: !0,
                            gridRowStart: !0,
                            lineHeight: !0,
                            opacity: !0,
                            order: !0,
                            orphans: !0,
                            widows: !0,
                            zIndex: !0,
                            zoom: !0
                        },
                        cssProps: {},
                        style: function(e, t, n, r) {
                            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                                var i, o, a, s = Y(t),
                                    u = Ye.test(t),
                                    l = e.style;
                                if (u || (t = Ve(s)), a = k.cssHooks[t] || k.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                                "string" == (o = typeof n) && (i = ie.exec(n)) && i[1] && (n = ce(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (k.cssNumber[s] ? "" : "px")), v.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
                            }
                        },
                        css: function(e, t, n, r) {
                            var i, o, a, s = Y(t);
                            return Ye.test(t) || (t = Ve(s)), (a = k.cssHooks[t] || k.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = We(e, t, r)), "normal" === i && t in Je && (i = Je[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
                        }
                    }), k.each(["height", "width"], (function(e, t) {
                        k.cssHooks[t] = {
                            get: function(e, n, r) {
                                if (n) return !Ge.test(k.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? et(e, t, r) : Ie(e, Qe, (function() {
                                    return et(e, t, r)
                                }))
                            },
                            set: function(e, n, r) {
                                var i, o = Me(e),
                                    a = !v.scrollboxSize() && "absolute" === o.position,
                                    s = (a || r) && "border-box" === k.css(e, "boxSizing", !1, o),
                                    u = r ? Ze(e, t, r, s, o) : 0;
                                return s && a && (u -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ze(e, t, "border", !1, o) - .5)), u && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = k.css(e, t)), Ke(0, n, u)
                            }
                        }
                    })), k.cssHooks.marginLeft = Be(v.reliableMarginLeft, (function(e, t) {
                        if (t) return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - Ie(e, {
                            marginLeft: 0
                        }, (function() {
                            return e.getBoundingClientRect().left
                        }))) + "px"
                    })), k.each({
                        margin: "",
                        padding: "",
                        border: "Width"
                    }, (function(e, t) {
                        k.cssHooks[e + t] = {
                            expand: function(n) {
                                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
                                return i
                            }
                        }, "margin" !== e && (k.cssHooks[e + t].set = Ke)
                    })), k.fn.extend({
                        css: function(e, t) {
                            return U(this, (function(e, t, n) {
                                var r, i, o = {},
                                    a = 0;
                                if (Array.isArray(t)) {
                                    for (r = Me(e), i = t.length; a < i; a++) o[t[a]] = k.css(e, t[a], !1, r);
                                    return o
                                }
                                return void 0 !== n ? k.style(e, t, n) : k.css(e, t)
                            }), e, t, 1 < arguments.length)
                        }
                    }), ((k.Tween = tt).prototype = {
                        constructor: tt,
                        init: function(e, t, n, r, i, o) {
                            this.elem = e, this.prop = n, this.easing = i || k.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (k.cssNumber[n] ? "" : "px")
                        },
                        cur: function() {
                            var e = tt.propHooks[this.prop];
                            return e && e.get ? e.get(this) : tt.propHooks._default.get(this)
                        },
                        run: function(e) {
                            var t, n = tt.propHooks[this.prop];
                            return this.options.duration ? this.pos = t = k.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : tt.propHooks._default.set(this), this
                        }
                    }).init.prototype = tt.prototype, (tt.propHooks = {
                        _default: {
                            get: function(e) {
                                var t;
                                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = k.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                            },
                            set: function(e) {
                                k.fx.step[e.prop] ? k.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !k.cssHooks[e.prop] && null == e.elem.style[Ve(e.prop)] ? e.elem[e.prop] = e.now : k.style(e.elem, e.prop, e.now + e.unit)
                            }
                        }
                    }).scrollTop = tt.propHooks.scrollLeft = {
                        set: function(e) {
                            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                        }
                    }, k.easing = {
                        linear: function(e) {
                            return e
                        },
                        swing: function(e) {
                            return .5 - Math.cos(e * Math.PI) / 2
                        },
                        _default: "swing"
                    }, k.fx = tt.prototype.init, k.fx.step = {};
                    var nt, rt, it, ot, at = /^(?:toggle|show|hide)$/,
                        st = /queueHooks$/;

                    function ut() {
                        rt && (!1 === x.hidden && r.requestAnimationFrame ? r.requestAnimationFrame(ut) : r.setTimeout(ut, k.fx.interval), k.fx.tick())
                    }

                    function lt() {
                        return r.setTimeout((function() {
                            nt = void 0
                        })), nt = Date.now()
                    }

                    function ct(e, t) {
                        var n, r = 0,
                            i = {
                                height: e
                            };
                        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = oe[r])] = i["padding" + n] = e;
                        return t && (i.opacity = i.width = e), i
                    }

                    function ft(e, t, n) {
                        for (var r, i = (dt.tweeners[t] || []).concat(dt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
                            if (r = i[o].call(n, t, e)) return r
                    }

                    function dt(e, t, n) {
                        var r, i, o = 0,
                            a = dt.prefilters.length,
                            s = k.Deferred().always((function() {
                                delete u.elem
                            })),
                            u = function() {
                                if (i) return !1;
                                for (var t = nt || lt(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) l.tweens[o].run(r);
                                return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1)
                            },
                            l = s.promise({
                                elem: e,
                                props: k.extend({}, t),
                                opts: k.extend(!0, {
                                    specialEasing: {},
                                    easing: k.easing._default
                                }, n),
                                originalProperties: t,
                                originalOptions: n,
                                startTime: nt || lt(),
                                duration: n.duration,
                                tweens: [],
                                createTween: function(t, n) {
                                    var r = k.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                                    return l.tweens.push(r), r
                                },
                                stop: function(t) {
                                    var n = 0,
                                        r = t ? l.tweens.length : 0;
                                    if (i) return this;
                                    for (i = !0; n < r; n++) l.tweens[n].run(1);
                                    return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                                }
                            }),
                            c = l.props;
                        for (function(e, t) {
                                var n, r, i, o, a;
                                for (n in e)
                                    if (i = t[r = Y(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = k.cssHooks[r]) && "expand" in a)
                                        for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
                                    else t[r] = i
                            }(c, l.opts.specialEasing); o < a; o++)
                            if (r = dt.prefilters[o].call(l, e, c, l.opts)) return m(r.stop) && (k._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
                        return k.map(c, ft, l), m(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), k.fx.timer(k.extend(u, {
                            elem: e,
                            anim: l,
                            queue: l.opts.queue
                        })), l
                    }
                    k.Animation = k.extend(dt, {
                        tweeners: {
                            "*": [function(e, t) {
                                var n = this.createTween(e, t);
                                return ce(n.elem, e, ie.exec(t), n), n
                            }]
                        },
                        tweener: function(e, t) {
                            m(e) ? (t = e, e = ["*"]) : e = e.match(F);
                            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], dt.tweeners[n] = dt.tweeners[n] || [], dt.tweeners[n].unshift(t)
                        },
                        prefilters: [function(e, t, n) {
                            var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t,
                                d = this,
                                p = {},
                                h = e.style,
                                g = e.nodeType && le(e),
                                v = K.get(e, "fxshow");
                            for (r in n.queue || (null == (a = k._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                                    a.unqueued || s()
                                }), a.unqueued++, d.always((function() {
                                    d.always((function() {
                                        a.unqueued--, k.queue(e, "fx").length || a.empty.fire()
                                    }))
                                }))), t)
                                if (i = t[r], at.test(i)) {
                                    if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                                        if ("show" !== i || !v || void 0 === v[r]) continue;
                                        g = !0
                                    }
                                    p[r] = v && v[r] || k.style(e, r)
                                }
                            if ((u = !k.isEmptyObject(t)) || !k.isEmptyObject(p))
                                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = K.get(e, "display")), "none" === (c = k.css(e, "display")) && (l ? c = l : (de([e], !0), l = e.style.display || l, c = k.css(e, "display"), de([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === k.css(e, "float") && (u || (d.done((function() {
                                        h.display = l
                                    })), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", d.always((function() {
                                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                                    }))), u = !1, p) u || (v ? "hidden" in v && (g = v.hidden) : v = K.access(e, "fxshow", {
                                    display: l
                                }), o && (v.hidden = !g), g && de([e], !0), d.done((function() {
                                    for (r in g || de([e]), K.remove(e, "fxshow"), p) k.style(e, r, p[r])
                                }))), u = ft(g ? v[r] : 0, r, d), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0))
                        }],
                        prefilter: function(e, t) {
                            t ? dt.prefilters.unshift(e) : dt.prefilters.push(e)
                        }
                    }), k.speed = function(e, t, n) {
                        var r = e && "object" == typeof e ? k.extend({}, e) : {
                            complete: n || !n && t || m(e) && e,
                            duration: e,
                            easing: n && t || t && !m(t) && t
                        };
                        return k.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in k.fx.speeds ? r.duration = k.fx.speeds[r.duration] : r.duration = k.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                            m(r.old) && r.old.call(this), r.queue && k.dequeue(this, r.queue)
                        }, r
                    }, k.fn.extend({
                        fadeTo: function(e, t, n, r) {
                            return this.filter(le).css("opacity", 0).show().end().animate({
                                opacity: t
                            }, e, n, r)
                        },
                        animate: function(e, t, n, r) {
                            var i = k.isEmptyObject(e),
                                o = k.speed(t, n, r),
                                a = function() {
                                    var t = dt(this, k.extend({}, e), o);
                                    (i || K.get(this, "finish")) && t.stop(!0)
                                };
                            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
                        },
                        stop: function(e, t, n) {
                            var r = function(e) {
                                var t = e.stop;
                                delete e.stop, t(n)
                            };
                            return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each((function() {
                                var t = !0,
                                    i = null != e && e + "queueHooks",
                                    o = k.timers,
                                    a = K.get(this);
                                if (i) a[i] && a[i].stop && r(a[i]);
                                else
                                    for (i in a) a[i] && a[i].stop && st.test(i) && r(a[i]);
                                for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                                !t && n || k.dequeue(this, e)
                            }))
                        },
                        finish: function(e) {
                            return !1 !== e && (e = e || "fx"), this.each((function() {
                                var t, n = K.get(this),
                                    r = n[e + "queue"],
                                    i = n[e + "queueHooks"],
                                    o = k.timers,
                                    a = r ? r.length : 0;
                                for (n.finish = !0, k.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                                for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                                delete n.finish
                            }))
                        }
                    }), k.each(["toggle", "show", "hide"], (function(e, t) {
                        var n = k.fn[t];
                        k.fn[t] = function(e, r, i) {
                            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ct(t, !0), e, r, i)
                        }
                    })), k.each({
                        slideDown: ct("show"),
                        slideUp: ct("hide"),
                        slideToggle: ct("toggle"),
                        fadeIn: {
                            opacity: "show"
                        },
                        fadeOut: {
                            opacity: "hide"
                        },
                        fadeToggle: {
                            opacity: "toggle"
                        }
                    }, (function(e, t) {
                        k.fn[e] = function(e, n, r) {
                            return this.animate(t, e, n, r)
                        }
                    })), k.timers = [], k.fx.tick = function() {
                        var e, t = 0,
                            n = k.timers;
                        for (nt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
                        n.length || k.fx.stop(), nt = void 0
                    }, k.fx.timer = function(e) {
                        k.timers.push(e), k.fx.start()
                    }, k.fx.interval = 13, k.fx.start = function() {
                        rt || (rt = !0, ut())
                    }, k.fx.stop = function() {
                        rt = null
                    }, k.fx.speeds = {
                        slow: 600,
                        fast: 200,
                        _default: 400
                    }, k.fn.delay = function(e, t) {
                        return e = k.fx && k.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, n) {
                            var i = r.setTimeout(t, e);
                            n.stop = function() {
                                r.clearTimeout(i)
                            }
                        }))
                    }, it = x.createElement("input"), ot = x.createElement("select").appendChild(x.createElement("option")), it.type = "checkbox", v.checkOn = "" !== it.value, v.optSelected = ot.selected, (it = x.createElement("input")).value = "t", it.type = "radio", v.radioValue = "t" === it.value;
                    var pt, ht = k.expr.attrHandle;
                    k.fn.extend({
                        attr: function(e, t) {
                            return U(this, k.attr, e, t, 1 < arguments.length)
                        },
                        removeAttr: function(e) {
                            return this.each((function() {
                                k.removeAttr(this, e)
                            }))
                        }
                    }), k.extend({
                        attr: function(e, t, n) {
                            var r, i, o = e.nodeType;
                            if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? k.prop(e, t, n) : (1 === o && k.isXMLDoc(e) || (i = k.attrHooks[t.toLowerCase()] || (k.expr.match.bool.test(t) ? pt : void 0)), void 0 !== n ? null === n ? void k.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = k.find.attr(e, t)) ? void 0 : r)
                        },
                        attrHooks: {
                            type: {
                                set: function(e, t) {
                                    if (!v.radioValue && "radio" === t && j(e, "input")) {
                                        var n = e.value;
                                        return e.setAttribute("type", t), n && (e.value = n), t
                                    }
                                }
                            }
                        },
                        removeAttr: function(e, t) {
                            var n, r = 0,
                                i = t && t.match(F);
                            if (i && 1 === e.nodeType)
                                for (; n = i[r++];) e.removeAttribute(n)
                        }
                    }), pt = {
                        set: function(e, t, n) {
                            return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n
                        }
                    }, k.each(k.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                        var n = ht[t] || k.find.attr;
                        ht[t] = function(e, t, r) {
                            var i, o, a = t.toLowerCase();
                            return r || (o = ht[a], ht[a] = i, i = null != n(e, t, r) ? a : null, ht[a] = o), i
                        }
                    }));
                    var gt = /^(?:input|select|textarea|button)$/i,
                        vt = /^(?:a|area)$/i;

                    function mt(e) {
                        return (e.match(F) || []).join(" ")
                    }

                    function yt(e) {
                        return e.getAttribute && e.getAttribute("class") || ""
                    }

                    function xt(e) {
                        return Array.isArray(e) ? e : "string" == typeof e && e.match(F) || []
                    }
                    k.fn.extend({
                        prop: function(e, t) {
                            return U(this, k.prop, e, t, 1 < arguments.length)
                        },
                        removeProp: function(e) {
                            return this.each((function() {
                                delete this[k.propFix[e] || e]
                            }))
                        }
                    }), k.extend({
                        prop: function(e, t, n) {
                            var r, i, o = e.nodeType;
                            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && k.isXMLDoc(e) || (t = k.propFix[t] || t, i = k.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
                        },
                        propHooks: {
                            tabIndex: {
                                get: function(e) {
                                    var t = k.find.attr(e, "tabindex");
                                    return t ? parseInt(t, 10) : gt.test(e.nodeName) || vt.test(e.nodeName) && e.href ? 0 : -1
                                }
                            }
                        },
                        propFix: {
                            for: "htmlFor",
                            class: "className"
                        }
                    }), v.optSelected || (k.propHooks.selected = {
                        get: function(e) {
                            var t = e.parentNode;
                            return t && t.parentNode && t.parentNode.selectedIndex, null
                        },
                        set: function(e) {
                            var t = e.parentNode;
                            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                        }
                    }), k.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
                        k.propFix[this.toLowerCase()] = this
                    })), k.fn.extend({
                        addClass: function(e) {
                            var t, n, r, i, o, a, s, u = 0;
                            if (m(e)) return this.each((function(t) {
                                k(this).addClass(e.call(this, t, yt(this)))
                            }));
                            if ((t = xt(e)).length)
                                for (; n = this[u++];)
                                    if (i = yt(n), r = 1 === n.nodeType && " " + mt(i) + " ") {
                                        for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                        i !== (s = mt(r)) && n.setAttribute("class", s)
                                    }
                            return this
                        },
                        removeClass: function(e) {
                            var t, n, r, i, o, a, s, u = 0;
                            if (m(e)) return this.each((function(t) {
                                k(this).removeClass(e.call(this, t, yt(this)))
                            }));
                            if (!arguments.length) return this.attr("class", "");
                            if ((t = xt(e)).length)
                                for (; n = this[u++];)
                                    if (i = yt(n), r = 1 === n.nodeType && " " + mt(i) + " ") {
                                        for (a = 0; o = t[a++];)
                                            for (; - 1 < r.indexOf(" " + o + " ");) r = r.replace(" " + o + " ", " ");
                                        i !== (s = mt(r)) && n.setAttribute("class", s)
                                    }
                            return this
                        },
                        toggleClass: function(e, t) {
                            var n = typeof e,
                                r = "string" === n || Array.isArray(e);
                            return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : m(e) ? this.each((function(n) {
                                k(this).toggleClass(e.call(this, n, yt(this), t), t)
                            })) : this.each((function() {
                                var t, i, o, a;
                                if (r)
                                    for (i = 0, o = k(this), a = xt(e); t = a[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                                else void 0 !== e && "boolean" !== n || ((t = yt(this)) && K.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : K.get(this, "__className__") || ""))
                            }))
                        },
                        hasClass: function(e) {
                            var t, n, r = 0;
                            for (t = " " + e + " "; n = this[r++];)
                                if (1 === n.nodeType && -1 < (" " + mt(yt(n)) + " ").indexOf(t)) return !0;
                            return !1
                        }
                    });
                    var bt = /\r/g;
                    k.fn.extend({
                        val: function(e) {
                            var t, n, r, i = this[0];
                            return arguments.length ? (r = m(e), this.each((function(n) {
                                var i;
                                1 === this.nodeType && (null == (i = r ? e.call(this, n, k(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = k.map(i, (function(e) {
                                    return null == e ? "" : e + ""
                                }))), (t = k.valHooks[this.type] || k.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                            }))) : i ? (t = k.valHooks[i.type] || k.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof(n = i.value) ? n.replace(bt, "") : null == n ? "" : n : void 0
                        }
                    }), k.extend({
                        valHooks: {
                            option: {
                                get: function(e) {
                                    var t = k.find.attr(e, "value");
                                    return null != t ? t : mt(k.text(e))
                                }
                            },
                            select: {
                                get: function(e) {
                                    var t, n, r, i = e.options,
                                        o = e.selectedIndex,
                                        a = "select-one" === e.type,
                                        s = a ? null : [],
                                        u = a ? o + 1 : i.length;
                                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !j(n.parentNode, "optgroup"))) {
                                            if (t = k(n).val(), a) return t;
                                            s.push(t)
                                        }
                                    return s
                                },
                                set: function(e, t) {
                                    for (var n, r, i = e.options, o = k.makeArray(t), a = i.length; a--;)((r = i[a]).selected = -1 < k.inArray(k.valHooks.option.get(r), o)) && (n = !0);
                                    return n || (e.selectedIndex = -1), o
                                }
                            }
                        }
                    }), k.each(["radio", "checkbox"], (function() {
                        k.valHooks[this] = {
                            set: function(e, t) {
                                if (Array.isArray(t)) return e.checked = -1 < k.inArray(k(e).val(), t)
                            }
                        }, v.checkOn || (k.valHooks[this].get = function(e) {
                            return null === e.getAttribute("value") ? "on" : e.value
                        })
                    })), v.focusin = "onfocusin" in r;
                    var wt = /^(?:focusinfocus|focusoutblur)$/,
                        Tt = function(e) {
                            e.stopPropagation()
                        };
                    k.extend(k.event, {
                        trigger: function(e, t, n, i) {
                            var o, a, s, u, l, c, f, d, h = [n || x],
                                g = p.call(e, "type") ? e.type : e,
                                v = p.call(e, "namespace") ? e.namespace.split(".") : [];
                            if (a = d = s = n = n || x, 3 !== n.nodeType && 8 !== n.nodeType && !wt.test(g + k.event.triggered) && (-1 < g.indexOf(".") && (g = (v = g.split(".")).shift(), v.sort()), l = g.indexOf(":") < 0 && "on" + g, (e = e[k.expando] ? e : new k.Event(g, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = v.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : k.makeArray(t, [e]), f = k.event.special[g] || {}, i || !f.trigger || !1 !== f.trigger.apply(n, t))) {
                                if (!i && !f.noBubble && !y(n)) {
                                    for (u = f.delegateType || g, wt.test(u + g) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                                    s === (n.ownerDocument || x) && h.push(s.defaultView || s.parentWindow || r)
                                }
                                for (o = 0;
                                    (a = h[o++]) && !e.isPropagationStopped();) d = a, e.type = 1 < o ? u : f.bindType || g, (c = (K.get(a, "events") || Object.create(null))[e.type] && K.get(a, "handle")) && c.apply(a, t), (c = l && a[l]) && c.apply && Q(a) && (e.result = c.apply(a, t), !1 === e.result && e.preventDefault());
                                return e.type = g, i || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(h.pop(), t) || !Q(n) || l && m(n[g]) && !y(n) && ((s = n[l]) && (n[l] = null), k.event.triggered = g, e.isPropagationStopped() && d.addEventListener(g, Tt), n[g](), e.isPropagationStopped() && d.removeEventListener(g, Tt), k.event.triggered = void 0, s && (n[l] = s)), e.result
                            }
                        },
                        simulate: function(e, t, n) {
                            var r = k.extend(new k.Event, n, {
                                type: e,
                                isSimulated: !0
                            });
                            k.event.trigger(r, null, t)
                        }
                    }), k.fn.extend({
                        trigger: function(e, t) {
                            return this.each((function() {
                                k.event.trigger(e, t, this)
                            }))
                        },
                        triggerHandler: function(e, t) {
                            var n = this[0];
                            if (n) return k.event.trigger(e, t, n, !0)
                        }
                    }), v.focusin || k.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, (function(e, t) {
                        var n = function(e) {
                            k.event.simulate(t, e.target, k.event.fix(e))
                        };
                        k.event.special[t] = {
                            setup: function() {
                                var r = this.ownerDocument || this.document || this,
                                    i = K.access(r, t);
                                i || r.addEventListener(e, n, !0), K.access(r, t, (i || 0) + 1)
                            },
                            teardown: function() {
                                var r = this.ownerDocument || this.document || this,
                                    i = K.access(r, t) - 1;
                                i ? K.access(r, t, i) : (r.removeEventListener(e, n, !0), K.remove(r, t))
                            }
                        }
                    }));
                    var Ct = r.location,
                        kt = {
                            guid: Date.now()
                        },
                        Et = /\?/;
                    k.parseXML = function(e) {
                        var t, n;
                        if (!e || "string" != typeof e) return null;
                        try {
                            t = (new r.DOMParser).parseFromString(e, "text/xml")
                        } catch (e) {}
                        return n = t && t.getElementsByTagName("parsererror")[0], t && !n || k.error("Invalid XML: " + (n ? k.map(n.childNodes, (function(e) {
                            return e.textContent
                        })).join("\n") : e)), t
                    };
                    var St = /\[\]$/,
                        At = /\r?\n/g,
                        Nt = /^(?:submit|button|image|reset|file)$/i,
                        Dt = /^(?:input|select|textarea|keygen)/i;

                    function jt(e, t, n, r) {
                        var i;
                        if (Array.isArray(t)) k.each(t, (function(t, i) {
                            n || St.test(e) ? r(e, i) : jt(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
                        }));
                        else if (n || "object" !== T(t)) r(e, t);
                        else
                            for (i in t) jt(e + "[" + i + "]", t[i], n, r)
                    }
                    k.param = function(e, t) {
                        var n, r = [],
                            i = function(e, t) {
                                var n = m(t) ? t() : t;
                                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                            };
                        if (null == e) return "";
                        if (Array.isArray(e) || e.jquery && !k.isPlainObject(e)) k.each(e, (function() {
                            i(this.name, this.value)
                        }));
                        else
                            for (n in e) jt(n, e[n], t, i);
                        return r.join("&")
                    }, k.fn.extend({
                        serialize: function() {
                            return k.param(this.serializeArray())
                        },
                        serializeArray: function() {
                            return this.map((function() {
                                var e = k.prop(this, "elements");
                                return e ? k.makeArray(e) : this
                            })).filter((function() {
                                var e = this.type;
                                return this.name && !k(this).is(":disabled") && Dt.test(this.nodeName) && !Nt.test(e) && (this.checked || !ge.test(e))
                            })).map((function(e, t) {
                                var n = k(this).val();
                                return null == n ? null : Array.isArray(n) ? k.map(n, (function(e) {
                                    return {
                                        name: t.name,
                                        value: e.replace(At, "\r\n")
                                    }
                                })) : {
                                    name: t.name,
                                    value: n.replace(At, "\r\n")
                                }
                            })).get()
                        }
                    });
                    var Lt = /%20/g,
                        qt = /#.*$/,
                        Ht = /([?&])_=[^&]*/,
                        Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                        Pt = /^(?:GET|HEAD)$/,
                        _t = /^\/\//,
                        Rt = {},
                        Ft = {},
                        Mt = "*/".concat("*"),
                        It = x.createElement("a");

                    function $t(e) {
                        return function(t, n) {
                            "string" != typeof t && (n = t, t = "*");
                            var r, i = 0,
                                o = t.toLowerCase().match(F) || [];
                            if (m(n))
                                for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                        }
                    }

                    function Wt(e, t, n, r) {
                        var i = {},
                            o = e === Ft;

                        function a(s) {
                            var u;
                            return i[s] = !0, k.each(e[s] || [], (function(e, s) {
                                var l = s(t, n, r);
                                return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1)
                            })), u
                        }
                        return a(t.dataTypes[0]) || !i["*"] && a("*")
                    }

                    function Bt(e, t) {
                        var n, r, i = k.ajaxSettings.flatOptions || {};
                        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
                        return r && k.extend(!0, e, r), e
                    }
                    It.href = Ct.href, k.extend({
                        active: 0,
                        lastModified: {},
                        etag: {},
                        ajaxSettings: {
                            url: Ct.href,
                            type: "GET",
                            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ct.protocol),
                            global: !0,
                            processData: !0,
                            async: !0,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            accepts: {
                                "*": Mt,
                                text: "text/plain",
                                html: "text/html",
                                xml: "application/xml, text/xml",
                                json: "application/json, text/javascript"
                            },
                            contents: {
                                xml: /\bxml\b/,
                                html: /\bhtml/,
                                json: /\bjson\b/
                            },
                            responseFields: {
                                xml: "responseXML",
                                text: "responseText",
                                json: "responseJSON"
                            },
                            converters: {
                                "* text": String,
                                "text html": !0,
                                "text json": JSON.parse,
                                "text xml": k.parseXML
                            },
                            flatOptions: {
                                url: !0,
                                context: !0
                            }
                        },
                        ajaxSetup: function(e, t) {
                            return t ? Bt(Bt(e, k.ajaxSettings), t) : Bt(k.ajaxSettings, e)
                        },
                        ajaxPrefilter: $t(Rt),
                        ajaxTransport: $t(Ft),
                        ajax: function(e, t) {
                            "object" == typeof e && (t = e, e = void 0), t = t || {};
                            var n, i, o, a, s, u, l, c, f, d, p = k.ajaxSetup({}, t),
                                h = p.context || p,
                                g = p.context && (h.nodeType || h.jquery) ? k(h) : k.event,
                                v = k.Deferred(),
                                m = k.Callbacks("once memory"),
                                y = p.statusCode || {},
                                b = {},
                                w = {},
                                T = "canceled",
                                C = {
                                    readyState: 0,
                                    getResponseHeader: function(e) {
                                        var t;
                                        if (l) {
                                            if (!a)
                                                for (a = {}; t = Ot.exec(o);) a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                            t = a[e.toLowerCase() + " "]
                                        }
                                        return null == t ? null : t.join(", ")
                                    },
                                    getAllResponseHeaders: function() {
                                        return l ? o : null
                                    },
                                    setRequestHeader: function(e, t) {
                                        return null == l && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, b[e] = t), this
                                    },
                                    overrideMimeType: function(e) {
                                        return null == l && (p.mimeType = e), this
                                    },
                                    statusCode: function(e) {
                                        var t;
                                        if (e)
                                            if (l) C.always(e[C.status]);
                                            else
                                                for (t in e) y[t] = [y[t], e[t]];
                                        return this
                                    },
                                    abort: function(e) {
                                        var t = e || T;
                                        return n && n.abort(t), E(0, t), this
                                    }
                                };
                            if (v.promise(C), p.url = ((e || p.url || Ct.href) + "").replace(_t, Ct.protocol + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(F) || [""], null == p.crossDomain) {
                                u = x.createElement("a");
                                try {
                                    u.href = p.url, u.href = u.href, p.crossDomain = It.protocol + "//" + It.host != u.protocol + "//" + u.host
                                } catch (e) {
                                    p.crossDomain = !0
                                }
                            }
                            if (p.data && p.processData && "string" != typeof p.data && (p.data = k.param(p.data, p.traditional)), Wt(Rt, p, t, C), l) return C;
                            for (f in (c = k.event && p.global) && 0 == k.active++ && k.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Pt.test(p.type), i = p.url.replace(qt, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Lt, "+")) : (d = p.url.slice(i.length), p.data && (p.processData || "string" == typeof p.data) && (i += (Et.test(i) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (i = i.replace(Ht, "$1"), d = (Et.test(i) ? "&" : "?") + "_=" + kt.guid++ + d), p.url = i + d), p.ifModified && (k.lastModified[i] && C.setRequestHeader("If-Modified-Since", k.lastModified[i]), k.etag[i] && C.setRequestHeader("If-None-Match", k.etag[i])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Mt + "; q=0.01" : "") : p.accepts["*"]), p.headers) C.setRequestHeader(f, p.headers[f]);
                            if (p.beforeSend && (!1 === p.beforeSend.call(h, C, p) || l)) return C.abort();
                            if (T = "abort", m.add(p.complete), C.done(p.success), C.fail(p.error), n = Wt(Ft, p, t, C)) {
                                if (C.readyState = 1, c && g.trigger("ajaxSend", [C, p]), l) return C;
                                p.async && 0 < p.timeout && (s = r.setTimeout((function() {
                                    C.abort("timeout")
                                }), p.timeout));
                                try {
                                    l = !1, n.send(b, E)
                                } catch (e) {
                                    if (l) throw e;
                                    E(-1, e)
                                }
                            } else E(-1, "No Transport");

                            function E(e, t, a, u) {
                                var f, d, x, b, w, T = t;
                                l || (l = !0, s && r.clearTimeout(s), n = void 0, o = u || "", C.readyState = 0 < e ? 4 : 0, f = 200 <= e && e < 300 || 304 === e, a && (b = function(e, t, n) {
                                    for (var r, i, o, a, s = e.contents, u = e.dataTypes;
                                        "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                                    if (r)
                                        for (i in s)
                                            if (s[i] && s[i].test(r)) {
                                                u.unshift(i);
                                                break
                                            }
                                    if (u[0] in n) o = u[0];
                                    else {
                                        for (i in n) {
                                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                                o = i;
                                                break
                                            }
                                            a || (a = i)
                                        }
                                        o = o || a
                                    }
                                    if (o) return o !== u[0] && u.unshift(o), n[o]
                                }(p, C, a)), !f && -1 < k.inArray("script", p.dataTypes) && k.inArray("json", p.dataTypes) < 0 && (p.converters["text script"] = function() {}), b = function(e, t, n, r) {
                                    var i, o, a, s, u, l = {},
                                        c = e.dataTypes.slice();
                                    if (c[1])
                                        for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                                    for (o = c.shift(); o;)
                                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                                            if ("*" === o) o = u;
                                            else if ("*" !== u && u !== o) {
                                        if (!(a = l[u + " " + o] || l["* " + o]))
                                            for (i in l)
                                                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                                    !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                                                    break
                                                }
                                        if (!0 !== a)
                                            if (a && e.throws) t = a(t);
                                            else try {
                                                t = a(t)
                                            } catch (e) {
                                                return {
                                                    state: "parsererror",
                                                    error: a ? e : "No conversion from " + u + " to " + o
                                                }
                                            }
                                    }
                                    return {
                                        state: "success",
                                        data: t
                                    }
                                }(p, b, C, f), f ? (p.ifModified && ((w = C.getResponseHeader("Last-Modified")) && (k.lastModified[i] = w), (w = C.getResponseHeader("etag")) && (k.etag[i] = w)), 204 === e || "HEAD" === p.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = b.state, d = b.data, f = !(x = b.error))) : (x = T, !e && T || (T = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (t || T) + "", f ? v.resolveWith(h, [d, T, C]) : v.rejectWith(h, [C, T, x]), C.statusCode(y), y = void 0, c && g.trigger(f ? "ajaxSuccess" : "ajaxError", [C, p, f ? d : x]), m.fireWith(h, [C, T]), c && (g.trigger("ajaxComplete", [C, p]), --k.active || k.event.trigger("ajaxStop")))
                            }
                            return C
                        },
                        getJSON: function(e, t, n) {
                            return k.get(e, t, n, "json")
                        },
                        getScript: function(e, t) {
                            return k.get(e, void 0, t, "script")
                        }
                    }), k.each(["get", "post"], (function(e, t) {
                        k[t] = function(e, n, r, i) {
                            return m(n) && (i = i || r, r = n, n = void 0), k.ajax(k.extend({
                                url: e,
                                type: t,
                                dataType: i,
                                data: n,
                                success: r
                            }, k.isPlainObject(e) && e))
                        }
                    })), k.ajaxPrefilter((function(e) {
                        var t;
                        for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
                    })), k._evalUrl = function(e, t, n) {
                        return k.ajax({
                            url: e,
                            type: "GET",
                            dataType: "script",
                            cache: !0,
                            async: !1,
                            global: !1,
                            converters: {
                                "text script": function() {}
                            },
                            dataFilter: function(e) {
                                k.globalEval(e, t, n)
                            }
                        })
                    }, k.fn.extend({
                        wrapAll: function(e) {
                            var t;
                            return this[0] && (m(e) && (e = e.call(this[0])), t = k(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                                return e
                            })).append(this)), this
                        },
                        wrapInner: function(e) {
                            return m(e) ? this.each((function(t) {
                                k(this).wrapInner(e.call(this, t))
                            })) : this.each((function() {
                                var t = k(this),
                                    n = t.contents();
                                n.length ? n.wrapAll(e) : t.append(e)
                            }))
                        },
                        wrap: function(e) {
                            var t = m(e);
                            return this.each((function(n) {
                                k(this).wrapAll(t ? e.call(this, n) : e)
                            }))
                        },
                        unwrap: function(e) {
                            return this.parent(e).not("body").each((function() {
                                k(this).replaceWith(this.childNodes)
                            })), this
                        }
                    }), k.expr.pseudos.hidden = function(e) {
                        return !k.expr.pseudos.visible(e)
                    }, k.expr.pseudos.visible = function(e) {
                        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
                    }, k.ajaxSettings.xhr = function() {
                        try {
                            return new r.XMLHttpRequest
                        } catch (e) {}
                    };
                    var zt = {
                            0: 200,
                            1223: 204
                        },
                        Ut = k.ajaxSettings.xhr();
                    v.cors = !!Ut && "withCredentials" in Ut, v.ajax = Ut = !!Ut, k.ajaxTransport((function(e) {
                        var t, n;
                        if (v.cors || Ut && !e.crossDomain) return {
                            send: function(i, o) {
                                var a, s = e.xhr();
                                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                                    for (a in e.xhrFields) s[a] = e.xhrFields[a];
                                for (a in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) s.setRequestHeader(a, i[a]);
                                t = function(e) {
                                    return function() {
                                        t && (t = n = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(zt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                            binary: s.response
                                        } : {
                                            text: s.responseText
                                        }, s.getAllResponseHeaders()))
                                    }
                                }, s.onload = t(), n = s.onerror = s.ontimeout = t("error"), void 0 !== s.onabort ? s.onabort = n : s.onreadystatechange = function() {
                                    4 === s.readyState && r.setTimeout((function() {
                                        t && n()
                                    }))
                                }, t = t("abort");
                                try {
                                    s.send(e.hasContent && e.data || null)
                                } catch (i) {
                                    if (t) throw i
                                }
                            },
                            abort: function() {
                                t && t()
                            }
                        }
                    })), k.ajaxPrefilter((function(e) {
                        e.crossDomain && (e.contents.script = !1)
                    })), k.ajaxSetup({
                        accepts: {
                            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                        },
                        contents: {
                            script: /\b(?:java|ecma)script\b/
                        },
                        converters: {
                            "text script": function(e) {
                                return k.globalEval(e), e
                            }
                        }
                    }), k.ajaxPrefilter("script", (function(e) {
                        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
                    })), k.ajaxTransport("script", (function(e) {
                        var t, n;
                        if (e.crossDomain || e.scriptAttrs) return {
                            send: function(r, i) {
                                t = k("<script>").attr(e.scriptAttrs || {}).prop({
                                    charset: e.scriptCharset,
                                    src: e.url
                                }).on("load error", n = function(e) {
                                    t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                                }), x.head.appendChild(t[0])
                            },
                            abort: function() {
                                n && n()
                            }
                        }
                    }));
                    var Xt, Vt = [],
                        Gt = /(=)\?(?=&|$)|\?\?/;
                    k.ajaxSetup({
                        jsonp: "callback",
                        jsonpCallback: function() {
                            var e = Vt.pop() || k.expando + "_" + kt.guid++;
                            return this[e] = !0, e
                        }
                    }), k.ajaxPrefilter("json jsonp", (function(e, t, n) {
                        var i, o, a, s = !1 !== e.jsonp && (Gt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Gt.test(e.data) && "data");
                        if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Gt, "$1" + i) : !1 !== e.jsonp && (e.url += (Et.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
                            return a || k.error(i + " was not called"), a[0]
                        }, e.dataTypes[0] = "json", o = r[i], r[i] = function() {
                            a = arguments
                        }, n.always((function() {
                            void 0 === o ? k(r).removeProp(i) : r[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, Vt.push(i)), a && m(o) && o(a[0]), a = o = void 0
                        })), "script"
                    })), v.createHTMLDocument = ((Xt = x.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Xt.childNodes.length), k.parseHTML = function(e, t, n) {
                        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (v.createHTMLDocument ? ((r = (t = x.implementation.createHTMLDocument("")).createElement("base")).href = x.location.href, t.head.appendChild(r)) : t = x), o = !n && [], (i = L.exec(e)) ? [t.createElement(i[1])] : (i = Te([e], t, o), o && o.length && k(o).remove(), k.merge([], i.childNodes)));
                        var r, i, o
                    }, k.fn.load = function(e, t, n) {
                        var r, i, o, a = this,
                            s = e.indexOf(" ");
                        return -1 < s && (r = mt(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && k.ajax({
                            url: e,
                            type: i || "GET",
                            dataType: "html",
                            data: t
                        }).done((function(e) {
                            o = arguments, a.html(r ? k("<div>").append(k.parseHTML(e)).find(r) : e)
                        })).always(n && function(e, t) {
                            a.each((function() {
                                n.apply(this, o || [e.responseText, t, e])
                            }))
                        }), this
                    }, k.expr.pseudos.animated = function(e) {
                        return k.grep(k.timers, (function(t) {
                            return e === t.elem
                        })).length
                    }, k.offset = {
                        setOffset: function(e, t, n) {
                            var r, i, o, a, s, u, l = k.css(e, "position"),
                                c = k(e),
                                f = {};
                            "static" === l && (e.style.position = "relative"), s = c.offset(), o = k.css(e, "top"), u = k.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, k.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
                        }
                    }, k.fn.extend({
                        offset: function(e) {
                            if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                                k.offset.setOffset(this, e, t)
                            }));
                            var t, n, r = this[0];
                            return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                                top: t.top + n.pageYOffset,
                                left: t.left + n.pageXOffset
                            }) : {
                                top: 0,
                                left: 0
                            } : void 0
                        },
                        position: function() {
                            if (this[0]) {
                                var e, t, n, r = this[0],
                                    i = {
                                        top: 0,
                                        left: 0
                                    };
                                if ("fixed" === k.css(r, "position")) t = r.getBoundingClientRect();
                                else {
                                    for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === k.css(e, "position");) e = e.parentNode;
                                    e && e !== r && 1 === e.nodeType && ((i = k(e).offset()).top += k.css(e, "borderTopWidth", !0), i.left += k.css(e, "borderLeftWidth", !0))
                                }
                                return {
                                    top: t.top - i.top - k.css(r, "marginTop", !0),
                                    left: t.left - i.left - k.css(r, "marginLeft", !0)
                                }
                            }
                        },
                        offsetParent: function() {
                            return this.map((function() {
                                for (var e = this.offsetParent; e && "static" === k.css(e, "position");) e = e.offsetParent;
                                return e || ae
                            }))
                        }
                    }), k.each({
                        scrollLeft: "pageXOffset",
                        scrollTop: "pageYOffset"
                    }, (function(e, t) {
                        var n = "pageYOffset" === t;
                        k.fn[e] = function(r) {
                            return U(this, (function(e, r, i) {
                                var o;
                                if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];
                                o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
                            }), e, r, arguments.length)
                        }
                    })), k.each(["top", "left"], (function(e, t) {
                        k.cssHooks[t] = Be(v.pixelPosition, (function(e, n) {
                            if (n) return n = We(e, t), Fe.test(n) ? k(e).position()[t] + "px" : n
                        }))
                    })), k.each({
                        Height: "height",
                        Width: "width"
                    }, (function(e, t) {
                        k.each({
                            padding: "inner" + e,
                            content: t,
                            "": "outer" + e
                        }, (function(n, r) {
                            k.fn[r] = function(i, o) {
                                var a = arguments.length && (n || "boolean" != typeof i),
                                    s = n || (!0 === i || !0 === o ? "margin" : "border");
                                return U(this, (function(t, n, i) {
                                    var o;
                                    return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? k.css(t, n, s) : k.style(t, n, i, s)
                                }), t, a ? i : void 0, a)
                            }
                        }))
                    })), k.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
                        k.fn[t] = function(e) {
                            return this.on(t, e)
                        }
                    })), k.fn.extend({
                        bind: function(e, t, n) {
                            return this.on(e, null, t, n)
                        },
                        unbind: function(e, t) {
                            return this.off(e, null, t)
                        },
                        delegate: function(e, t, n, r) {
                            return this.on(t, e, n, r)
                        },
                        undelegate: function(e, t, n) {
                            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                        },
                        hover: function(e, t) {
                            return this.mouseenter(e).mouseleave(t || e)
                        }
                    }), k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
                        k.fn[t] = function(e, n) {
                            return 0 < arguments.length ? this.on(t, null, e, n) : this.trigger(t)
                        }
                    }));
                    var Yt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                    k.proxy = function(e, t) {
                        var n, r, i;
                        if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function() {
                            return e.apply(t || this, r.concat(s.call(arguments)))
                        }).guid = e.guid = e.guid || k.guid++, i
                    }, k.holdReady = function(e) {
                        e ? k.readyWait++ : k.ready(!0)
                    }, k.isArray = Array.isArray, k.parseJSON = JSON.parse, k.nodeName = j, k.isFunction = m, k.isWindow = y, k.camelCase = Y, k.type = T, k.now = Date.now, k.isNumeric = function(e) {
                        var t = k.type(e);
                        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
                    }, k.trim = function(e) {
                        return null == e ? "" : (e + "").replace(Yt, "")
                    }, void 0 === (n = function() {
                        return k
                    }.apply(t, [])) || (e.exports = n);
                    var Qt = r.jQuery,
                        Jt = r.$;
                    return k.noConflict = function(e) {
                        return r.$ === k && (r.$ = Jt), e && r.jQuery === k && (r.jQuery = Qt), k
                    }, void 0 === i && (r.jQuery = r.$ = k), k
                }))
            }
        },
        t = {};

    function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.exports
    }
    n.g = function() {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" == typeof window) return window
            }
        }(),
        function() {
            var e;
            n.g.importScripts && (e = n.g.location + "");
            var t = n.g.document;
            if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
                var r = t.getElementsByTagName("script");
                r.length && (e = r[r.length - 1].src)
            }
            if (!e) throw new Error("Automatic publicPath is not supported in this browser");
            e = e.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), n.p = e + "../../../"
        }(),
        function() {
            "use strict";
            n.p
        }(),
        function() {
            "use strict";
            n(825), n(74);
            var e = n(639);
            $(document).ready((function() {
                $("#manifest-header").on("click", ".track-navigation-click", (function() {
                    var t = new e.Event("global_navigation_click");
                    t.setCategory("header"), t.setField("link_text", $(this).text()), t.send()
                }))
            }));
            n(732), n(999);
            (0, e.sisterTracking)("themanifest", window.environment, 5)
        }()
}();