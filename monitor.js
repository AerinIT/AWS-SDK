const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' }); // Update to your region

const cloudwatch = new AWS.CloudWatch();

// Define the dashboard configuration
const dashboardName = 'sample-metrics';
const dashboardBody = JSON.stringify({
  widgets: [
    {
      type: 'metric',
      x: 0,
      y: 0,
      width: 24,
      height: 6,
      properties: {
        metrics: [
          [ 'AWS/ApiGateway', '4XXError', 'ApiId', '7r82euqtv8' ],
          [ 'AWS/ApiGateway', '5XXError', 'ApiId', '7r82euqtv8' ],
          [ 'AWS/ApiGateway', 'Count', 'ApiId', '7r82euqtv8' ],
          [ 'AWS/ApiGateway', 'Latency', 'ApiId', '7r82euqtv8' ],
          [ 'AWS/ApiGateway', 'IntegrationLatency', 'ApiId', '7r82euqtv8' ],
          [ 'AWS/ApiGateway', 'DataProcessed', 'ApiId', '7r82euqtv8' ]
        ],
        view: 'gauge', // Changed view to 'gauge'
        region: 'us-east-1',
        title: 'API Metrics',
        period: 300,
        stat: 'Average', // or any other statistic you prefer
        yAxis: {
          left: {
            label: 'Count',
            min: 0,
            max: 1000 // Adjust as needed
          },
          right: {
            label: 'Latency (ms)',
            min: 0,
            max: 500 // Adjust as needed
          }
        },
        sparkline: true
      }
    }
  ]
});

// Create or update the dashboard
const params = {
  DashboardName: dashboardName,
  DashboardBody: dashboardBody
};

cloudwatch.putDashboard(params, (err, data) => {
  if (err) {
    console.error('Error creating or updating dashboard:', err);
  } else {
    console.log('Dashboard created or updated successfully:', data);
  }
});