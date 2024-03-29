// ==UserScript==
// @name         Mod Tools VPN
// @namespace    http://www.reddit.com/u/rke12
// @updateURL    https://github.com/ballzilla/TP/raw/main/VPNCheck.user.js
// @downloadURL  https://github.com/ballzilla/TP/raw/main/VPNCheck.user.js
// @version      1.1.0
// @description  Mod Tools VPN Check
// @author       Ballzilla
// @include      https://tagpro.koalabeast.com/moderate/users*
// @include      https://tagpro.koalabeast.com/moderate/ips*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addValueChangeListener
// ==/UserScript==
var section = window.location.pathname.indexOf('users') > -1 ? 'users' : 'ips';

function getIPInfo(ip) {
    GM_xmlhttpRequest({
        method: "GET",
        headers: {
            "Accept": "application/json",
            "X-key": "NTQ2ODo1cFZHbXNwRlg2b3dseXFxVnBmbWhsSTgzZGZrUUxvYQ=="
        },
        url: "http://v2.api.iphub.info/ip/"+ip,
        onload: function(response) {
            var json = JSON.parse(response.responseText),
                type, color;
            if (json.block == 0) {
                type = 'Residential or business';
                color = '#04bd04'; // green
            } else if (json.block == 1) {
                type = 'Non-residential IP';
                color = '#e74c3c'; // red
            } else if (json.block == 2) {
                type = 'Non-residential & residential IP';
                color = '#f39c12'; // orange
            }

            var ipInfo = $("<div style='padding-left:20px'></div>");
            ipInfo.append("<div style='max-width:300px'><span>Country</span><span style='float:right'>"+json.countryName+"</span></div>");
            ipInfo.append("<div style='max-width:300px'><span>ISP</span><span style='float:right'>"+json.isp+"</span></div>");
            ipInfo.append("<div style='max-width:300px'><span>Type</span><span style='float:right; color:"+color+"'>"+type+"</span></div>");
            $('#ipCheck').parent().append(ipInfo);
        }
    });
}

var ipCheck = $("<button id='ipCheck' class='tiny'>VPN Check</button>");
ipCheck.on('click', function(e) {
    e.preventDefault();
    var el = $(this);
    el.hide();
    getIPInfo(el.prev().text());
});
$('label:contains("'+ (section == 'users' ? 'Last IP' : 'IP Address') +'")').parent().append(ipCheck);

