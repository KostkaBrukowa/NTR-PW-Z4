using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Z01.Models;

namespace Z4
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = CreateWebHostBuilder(args).Build();
      byte[] x = { 1, 2 };
      using (IServiceScope scope = host.Services.CreateScope())
      {
        var context = scope.ServiceProvider.GetRequiredService<MyContext>();

        context.SaveChanges();
      }

      host.Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args)
    {
      return WebHost.CreateDefaultBuilder(args)
          .UseStartup<Startup>();
    }
  }
}
