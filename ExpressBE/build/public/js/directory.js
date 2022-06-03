! function() {
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
                            let i = Object.assign({}, t);
                            if (n) {
                                i.send_to = n;
                                try {
                                    window.gtag("event", e, i)
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
                        r = n.length,
                        a = "",
                        s = "",
                        c = "",
                        d = "",
                        l = o(r);
                    [...n].forEach(((e, n) => function(e, n) {
                        a = e.getAttribute("data-id"), d = e.getAttribute("data-uid"), s = n + 1, c = e.getAttribute("data-type");
                        let o = new t("ad_impression");
                        o.setCategory("ppc"), o.setField("provider_id", a), o.setField("position", s), o.setField("ad_category", l), o.setField("ad_format", c), o.setField("ad_event_id", d), "colored" === c && o.setField("ad_color", i(e));
                        o.send();
                        let r = new t("ad_impression_");
                        r.setCategory("ppc"), r.setField("provider_id", a), r.setField("position", s), r.setField("ad_category", l), r.setField("ad_format", c), r.setField("ad_event_id", d), "colored" === c && r.setField("ad_color", i(e));
                        r.send()
                    }(e, n)))
                }

                function i(e) {
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

                function o(e) {
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

                function r() {
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
                    trackWebsiteClick: function(e, n, i = "", o = "Visit Website Click", r) {
                        if (!e) return void console.error("Provider id not specified");
                        let a = new t(o);
                        switch (a.setCategory("visit_website"), a.setLabel(e), a.setField("provider_id", e), void 0 !== n && a.setField("position", n), r && a.setField("link_text", r), i) {
                            case !1:
                            case "":
                                a.setField("is_sponsor", !1);
                                break;
                            case "featured":
                            case "sponsor":
                                a.setField("link_type", i), a.setField("is_sponsor", !0);
                                break;
                            case "recommendation":
                                a.setField("link_type", i), a.setField("is_sponsor", !1);
                                break;
                            default:
                                a.setField("link_type", i), a.setField("is_sponsor", i)
                        }
                        a.send()
                    },
                    trackAdClick: function(e, n, r, a) {
                        let s = document.querySelector(`[data-id='${e}']`),
                            c = document.querySelectorAll(".ppc_item").length;
                        if (!e) return void console.error("Provider id not specified");
                        if (!n) return void console.error("Position is not specified");
                        let d = new t("ad_click");
                        d.setCategory("ppc"), "colored" === a && d.setField("ad_color", i(s)), d.setField("provider_id", e), d.setField("ad_event_id", s.getAttribute("data-uid")), d.setField("ad_category", o(c)), d.setField("position", n), d.setField("link_text", r), d.setField("ad_format", a), d.send();
                        let l = new t("ad_click_");
                        l.setCategory("ppc"), "colored" === a && l.setField("ad_color", i(s)), l.setField("provider_id", e), l.setField("ad_event_id", s.getAttribute("data-uid")), l.setField("ad_category", o(c)), l.setField("position", n), l.setField("link_text", r), l.setField("ad_format", a), l.send()
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
                        document.body.clientHeight > window.innerHeight ? window.addEventListener("scroll", (function i() {
                            const o = document.documentElement,
                                r = document.body,
                                a = "scrollTop",
                                s = "scrollHeight",
                                c = Math.floor((o[a] || r[a]) / ((o[s] || r[s]) - o.clientHeight) * 100);
                            if (c >= e) {
                                window.removeEventListener("scroll", i), n();
                                const e = new t("user_scroll_engagement");
                                e.setField("scroll_depth", c), e.send()
                            }
                        })) : setTimeout((function() {
                            new t("user_timer_engagement").send()
                        }), e / 5)
                    },
                    sisterTracking: function(e, t = "production", n = 0) {
                        document.cookie.split("; ").find((e => e.startsWith("visited_sister_site"))) || setTimeout((function() {
                            let n = document.cookie.split("; ").filter((e => e.startsWith("_ga="))).map((e => e.slice(4))),
                                i = "";
                            if (!n) return;
                            i = n[0];
                            let o = "https://clutch.co";
                            "production" !== t && (o = "https://staging.clutch.co");
                            let r = document.createElement("iframe");
                            r.src = `${o}/t/ps?client_id=${i}&event_name=${e}&domain=${window.location.host}`, r.id = "track_frame", r.width = "0", r.height = "0", r.style.border = "none", r.style.background = "transparent", document.body.appendChild(r), document.querySelector("#track_frame").addEventListener("load", (function() {
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
                            send_to: `${r()}/${e}`,
                            event_callback: n
                        })
                    }
                }
            },
            482: function() {
                window.lazyLoadOptions = {
                    elements_selector: ".lazy"
                }, window.addEventListener("LazyLoad::Initialized", (function(e) {
                    window.lazyLoadInstance = e.detail.instance
                }), !1);
                var e = function() {
                    var e, t;
                    if ("IntersectionObserver" in window) {
                        e = document.querySelectorAll(".lazy");
                        var n = new IntersectionObserver((function(e) {
                            $.each(e, (function(e, t) {
                                if (t.isIntersecting) {
                                    var i = t.target;
                                    i.src = i.dataset.src, i.classList.remove("lazy"), n.unobserve(i)
                                }
                            }))
                        }));
                        $.each(e, (function(e, t) {
                            n.observe(t)
                        }))
                    } else e = document.querySelectorAll(".lazy"), i(), document.addEventListener("scroll", i), window.addEventListener("resize", i), window.addEventListener("orientationChange", i);

                    function i() {
                        t && clearTimeout(t), t = setTimeout((function() {
                            var t = window.pageYOffset;
                            $.each(e, (function(e, n) {
                                n.offsetTop < window.innerHeight + t && (n.src = n.dataset.src, n.classList.remove("lazy"))
                            })), 0 === e.length && (document.removeEventListener("scroll", i), window.removeEventListener("resize", i), window.removeEventListener("orientationChange", i))
                        }), 20)
                    }
                };
                window.addEventListener("DOMContentLoaded", e, !1), window.addEventListener("DOMNodeInserted", e, !1)
            },
            283: function(e, t, n) {
                function i(e, t) {
                    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (!n) {
                        if (Array.isArray(e) || (n = function(e, t) {
                                if (!e) return;
                                if ("string" == typeof e) return o(e, t);
                                var n = Object.prototype.toString.call(e).slice(8, -1);
                                "Object" === n && e.constructor && (n = e.constructor.name);
                                if ("Map" === n || "Set" === n) return Array.from(e);
                                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return o(e, t)
                            }(e)) || t && e && "number" == typeof e.length) {
                            n && (e = n);
                            var i = 0,
                                r = function() {};
                            return {
                                s: r,
                                n: function() {
                                    return i >= e.length ? {
                                        done: !0
                                    } : {
                                        done: !1,
                                        value: e[i++]
                                    }
                                },
                                e: function(e) {
                                    throw e
                                },
                                f: r
                            }
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }
                    var a, s = !0,
                        c = !1;
                    return {
                        s: function() {
                            n = n.call(e)
                        },
                        n: function() {
                            var e = n.next();
                            return s = e.done, e
                        },
                        e: function(e) {
                            c = !0, a = e
                        },
                        f: function() {
                            try {
                                s || null == n.return || n.return()
                            } finally {
                                if (c) throw a
                            }
                        }
                    }
                }

                function o(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
                    return i
                }
                var r = n(721);
                $(document).ready((function() {
                    var e, t = $("#faq-data"),
                        n = t.html();
                    if (n && "string" == typeof n && (e = JSON.parse(n)), e && e.title && e.description && e.mainEntity && e.mainEntity.length) {
                        t.before($(r.default));
                        var o = $(".directory-faq__title"),
                            a = $(".directory-faq__description"),
                            s = $(".directory-faq__list");
                        o.text(e.title), a.text(e.description);
                        var c, d = i(e.mainEntity);
                        try {
                            for (d.s(); !(c = d.n()).done;) {
                                var l = c.value;
                                s.append('\n            <li class="directory-faq__item">\n              <strong>'.concat(l.name, "</strong>\n              <p>").concat(l.acceptedAnswer.text, "</p>\n            </li>\n        "))
                            }
                        } catch (e) {
                            d.e(e)
                        } finally {
                            d.f()
                        }
                    }
                }))
            },
            721: function(e, t, n) {
                "use strict";
                n.r(t);
                t.default = '\n<section id="directory-faq" class="directory-faq">\n  <div class="directory-faq__wrap container">\n    <div class="directory-faq__header">\n      <a href="#directory-intro" class="directory-faq__jump directory-jump to-top">Return to top</a>\n      <h2 class="directory-faq__title"></h2>\n    </div>\n    <p class="directory-faq__description"></p>\n    <ul class="directory-faq__list"></ul>\n    <a href="#directory-intro" class="directory-faq__jump mobile directory-jump to-top">Return to top</a>\n  </div>\n</section>\n'
            }
        },
        t = {};

    function n(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var r = t[i] = {
            exports: {}
        };
        return e[i](r, r.exports, n), r.exports
    }
    n.g = function() {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" == typeof window) return window
            }
        }(), n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        },
        function() {
            var e;
            n.g.importScripts && (e = n.g.location + "");
            var t = n.g.document;
            if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
                var i = t.getElementsByTagName("script");
                i.length && (e = i[i.length - 1].src)
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
            n(482);
            var e = n(639);

            function t(e, t, n) {
                return "/redirect?from_page=".concat(encodeURIComponent("".concat(window.location.href)), "&pid=").concat(t, "&position=").concat(n, "&source=directory&u=").concat(encodeURIComponent("".concat(e)))
            }

            function i(t, n) {
                var i = new e.Event("lead_matching_click");
                i.setCategory("lead_matching"), i.setField("position", t), i.setField("link_text", n), i.send()
            }
            $(document).ready((function() {
                var n = $("#directory-intro"),
                    o = $("#directory-providers"),
                    r = $("#most-reviewed");
                $(".directory-header__breadcrumbs").on("click", "a", (function() {
                    var t = new e.Event("breadcrumbs_click");
                    t.setCategory("directory"), t.setField("link_text", $(this).text()), t.send()
                })), n.on("click", "#read_more", (function() {
                    var t = new e.Event("read_more_click");
                    t.setCategory("directory"), t.setField("position", "introduction"), t.setField("link_text", $(this).text()), t.send()
                })), $(".directory-jump.to-bottom").on("click", (function() {
                    var t = new e.Event("awards_jumplink");
                    t.setCategory("directory"), t.setField("position", "top"), t.setField("link_text", $(this).text()), t.send()
                })), o.on("click", ".rating-box__overall-reviews-link, .rating-box__empty-leave-review", (function() {
                    var t = new e.Event("review_widget_click");
                    t.setCategory("reviews"), t.setField("position", "company card"), t.setField("link_text", $(this).text()), t.send()
                })), n.on("click", "p a", (function() {
                    i("top", $(this).text())
                })), $("body").on("click", ".track-CTA-click", (function() {
                    var e = $(this);
                    i(e.data("position"), e.text())
                })), $(".pagination").on("click", "a", (function() {
                    var t = $(this);
                    t.parent().addClass("loading");
                    var n = new e.Event("pagers_click");
                    n.setCategory("directory"), n.setField("link_text", t.text()), n.send()
                })), r.on("click", ".directory-awards__item-reviews", (function() {
                    var t = $(this).parents("[data-id]"),
                        n = t.data("id"),
                        i = t.data("position"),
                        o = new e.Event("manifest_awards_profile_click");
                    o.setCategory("profile_click"), o.setField("position", i), o.setField("provider_id", n), o.send()
                })), $(".related-content__list").on("click", "a", (function() {
                    var t = new e.Event("related_content_block_click");
                    t.setCategory("related_content_block"), t.setField("event_category", "related_content_block"), t.send()
                }))
            }));
            n(283);

            function o(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3,
                    i = $(e);
                i.length && $("html, body").animate({
                    scrollTop: i.offset().top + t
                }, n)
            }
            $(document).ready((function() {
                var e, t, n = $(".directory-intro__text"),
                    i = $("#manifest-header").height() + $("#manifest-sticky-header").height() || 0,
                    r = !1;

                function a(e) {
                    var t = $(e);
                    if (t.length) {
                        var n = t.offset().top - i;
                        t.hasClass("provider-card") && (n -= 30), window.scrollTo(0, n)
                    }
                }
                e = ".custom_popover", (t = $(".container")).off("mouseover"), t.on("mouseover", "".concat(e), (function() {
                    var e = $(this).attr("data-popover-position"),
                        t = document.createElement("div"),
                        n = $(this).attr("data-props"),
                        i = $(this).attr("data-content"),
                        o = "";
                    n && (o = n), t.setAttribute("class", "custom_popover__container ".concat(o)), t.insertAdjacentHTML("beforeend", i), t.insertAdjacentHTML("beforeend", '<span class="custom_popover__arrow"></span>'), e ? $(this).find("".concat(e)).append(t) : $(this).append(t)
                })), t.off("mouseout"), t.on("mouseout", "".concat(e), (function() {
                    $(this).find(".custom_popover__container").remove()
                })), n.on("click", "#read_more, #read_less", (function() {
                    return n.toggleClass("shown")
                })), $(".directory-jump.to-bottom").on("click", (function() {
                    o("#most-reviewed", -i)
                })), $(".directory-jump.to-top").on("click", (function() {
                    o("#directory-intro", -i)
                })), $(window).on("load", (function() {
                    r = !0, window.location.hash && a(window.location.hash)
                })), $(window).on("hashchange", (function() {
                    window.location.hash && r && a(window.location.hash)
                }))
            }))
        }()
}();