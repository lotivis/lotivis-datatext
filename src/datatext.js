import { csvRender } from "lotivis-csv";
import { chart as baseChart, config } from "lotivis-chart";

var datatextIndex = 0;

function postfix(src, post) {
  return (src = "" + src), src.endsWith(post || "") ? src : src + post;
}

function downloadURL(url, fname) {
  let a = document.createElement("a");
  a.href = url;
  a.download = fname;
  a.click();
}

export const datatextJSONData = function (dt, dv) {
  return JSON.stringify(dv.data, null, 2);
};

export const datatextJSON = function (dt, dv) {
  return JSON.stringify(dv, null, 2);
};

export const datatextCSV = function (dt, dv) {
  return csvRender(dv.data);
};

export function datatext() {
  let cachedText,
    cachedHTML,
    attr = {
      // the id of the datatext
      id: "datatext-" + ++datatextIndex,

      // max height
      height: 800,

      // margin
      marginLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,

      backgroundColor: null,

      // whether the datatext is enabled
      enabled: true,

      // (optional) title of the datatext
      title: (dt, dv) => "Datatext",

      // the text to display for the data
      text: datatextJSON,

      // the data controller
      dataController: null,
    };

  let chart = baseChart(attr);

  // private
  function isType(obj, ...types) {
    return types.indexOf(typeof obj) !== -1;
  }

  function inCodeTags(value) {
    return (
      '<code style="display: block" class="ltv-datatext-code">' +
      value +
      "</code>"
    );
  }

  function html(text) {
    return isType(text, "string")
      ? "" + text.split("\n").map(inCodeTags).join("")
      : "" + text;
  }

  function unwrap(value, ...args) {
    return isType(value, "function") ? value(...args) : value;
  }

  function renderDivision(container, calc, dv) {
    calc.div = container
      .append("div")
      .classed("ltv-datatext", true)
      .attr("id", attr.id)
      .style("background-color", attr.backgroundColor)
      .style("padding-left", attr.marginLeft + "px")
      .style("padding-top", attr.marginTop + "px")
      .style("padding-right", attr.marginRight + "px")
      .style("padding-bottom", attr.marginBottom + "px");
  }

  function renderTitle(container, calc, dv) {
    calc.title = calc.div
      .append("div")
      .classed("ltv-datatext-title", true)
      .text(unwrap(attr.title, chart, dv))
      .style("cursor", attr.enabled ? "pointer" : null)
      .on("click", attr.enabled ? chart.download : null);
  }

  function renderPre(container, calc, dv) {
    if (!cachedText || !cachedHTML) {
      cachedText = unwrap(attr.text, chart, dv, attr.dataController);
      cachedHTML = html(cachedText);
    }

    calc.pre = calc.div
      .append("pre")
      .classed("ltv-datatext-pre", true)
      .attr("counter-reset", "line")
      .html(cachedHTML);

    if (isType(attr.height, "string", "number")) {
      calc.pre
        .style("height", postfix(attr.height, "px"))
        .style("overflow", "scroll");
    }
  }

  // public
  chart.download = function () {
    let type, extension;

    if (attr.text === datatextCSV) {
      type = "text/csv";
      extension = "csv";
    } else if (attr.text === datatextJSONData || attr.text === datatextJSON) {
      type = "text/json";
      extension = "json";
    } else {
      type = "text/text";
      extension = "txt";
    }

    let blob = new Blob([cachedText], { type: type }),
      objectURL = URL.createObjectURL(blob),
      filename = attr.dataController.filename(extension, "datatext");

    downloadURL(objectURL, filename);

    return chart;
  };

  chart.dataView = function () {
    let dc = attr.dataController;
    if (!dc) throw new Error("no data controller");

    let dv = {};

    dv.data = dc.data();
    dv.labels = dv.data.labels;
    dv.groups = dv.data.groups;
    dv.locations = dv.data.locations;
    dv.dates = dv.data.dates;

    return dv;
  };

  chart.render = function (container, calc, dv) {
    renderDivision(container, calc, dv);

    if (attr.title) {
      renderTitle(container, calc, dv);
    }

    renderPre();

    return chart;
  };

  return chart;
}
