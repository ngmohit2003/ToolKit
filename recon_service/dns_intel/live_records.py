import dns.resolver
from .resolvers import PUBLIC_RESOLVERS, DNS_RECORD_TYPES



PUBLIC_RESOLVERS = {
    "google": "8.8.8.8",
    "cloudflare": "1.1.1.1",
    "quad9": "9.9.9.9"
}

RECORD_TYPES = ["A", "AAAA", "MX", "NS", "TXT", "CNAME", "SOA"]


def query_dns(domain: str):
    results = {}

    for record in RECORD_TYPES:
        results[record] = {}

        for name, resolver_ip in PUBLIC_RESOLVERS.items():
            try:
                resolver = dns.resolver.Resolver()
                resolver.nameservers = [resolver_ip]
                answers = resolver.resolve(domain, record, lifetime=3)

                results[record][name] = [str(r) for r in answers]

            except Exception as e:
                results[record][name] = []

    return results



# def query_dns(domain: str):
#     results = {}

#     for resolver_name, resolver_ip in PUBLIC_RESOLVERS.items():
#         resolver = dns.resolver.Resolver()
#         resolver.nameservers = [resolver_ip]
#         resolver.timeout = 3
#         resolver.lifetime = 3

#         resolver_results = {}

#         for record_type in DNS_RECORD_TYPES:
#             try:
#                 answer = resolver.resolve(domain, record_type)

#                 resolver_results[record_type] = {
#                     "records": [str(r) for r in answer],
#                     "ttl": answer.rrset.ttl
#                 }

#             except Exception:
#                 # Resolver has no data or record doesn't exist
#                 resolver_results[record_type] = {
#                     "records": [],
#                     "ttl": None
#                 }

#         results[resolver_name] = resolver_results

#     return results

