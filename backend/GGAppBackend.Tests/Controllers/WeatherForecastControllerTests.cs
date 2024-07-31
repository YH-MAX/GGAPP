using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using FluentAssertions;
using System;
using QPAppBackend.Models;

namespace QPAppBackend.Tests.Controllers
{
    public class WeatherForecastControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public WeatherForecastControllerTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetItems_ReturnsExpectedItems()
        {
            // Arrange
            var client = _factory.CreateClient();
            // Act
            var response = await client.GetAsync("/api/WeatherForecast");

            // Assert
            response.EnsureSuccessStatusCode();
            var forecasts = await response.Content.ReadAsAsync<IEnumerable<WeatherForecast>>();
            int index = 1;
            string[] summaries = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

            foreach (WeatherForecast forecast in forecasts)
            {
                forecast.Date.Should().Be(DateOnly.FromDateTime(DateTime.Now.AddDays(index)));
                forecast.TemperatureC.Should().BeInRange(-20, 55);
                forecast.Summary.Should().BeOneOf(summaries);
                index++;
            }
        }
    }
}
