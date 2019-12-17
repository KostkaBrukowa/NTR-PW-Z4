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
            using (IServiceScope scope = host.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MyContext>();

                context.Notes.Add(
                    new Note
                    {
                        Title = "First Author",
                        Description = "First descp",
                    }
                );
                context.Notes.Add(
                    new Note
                    {
                        Title = "Second Author",
                        Description = "Second descp",
                    }
                );

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
