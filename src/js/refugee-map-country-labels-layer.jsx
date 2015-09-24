
var React = require('react');
var d3 = require('d3');
var _ = require('underscore');

var RefugeeMapCountryLabelsLayer = React.createClass({


  /*
    shouldComponentUpdate: function(nextProps, nextState) {
    	return nextProps.highlightedCountry !== this.props.highlightedCountry;
    },
  */


  renderCountryLabel: function(country, type) {
    var point = this.props.projection(
      this.props.mapModel.getCenterPointOfCountry(country));

    return (
    <text key={country + type} x={point[0]} y={point[1] + 15} className={type}>
      {this.props.mapModel.getFriendlyNameForCountry(country)}
    </text>
    );
  },


  renderCountryLabels: function() {
  	var items = [];

    if (this.props.country === null) {
      return items;
    }

  	items.push(this.renderCountryLabel(this.props.country, "highlighted"))

  	this.props.destinationCountries.map(function(country) {
  		items.push(this.renderCountryLabel(country, "destination"));
  	}.bind(this));

    this.props.originCountries.map(function(country) {
  		items.push(this.renderCountryLabel(country, "origin"));
  	}.bind(this));

    return items;
  },


  render: function() {
		return (
		 <svg className="refugee-map__country-labels-layer"
		    style={{width: this.props.width, height: this.props.height}}>
		    {this.renderCountryLabels()}
		 </svg>
		)
  }


});

module.exports = RefugeeMapCountryLabelsLayer;

