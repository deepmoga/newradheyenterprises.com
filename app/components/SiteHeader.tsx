"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { companySettings, productPages, serviceSummaries } from "../site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const productHref = (title: string) => {
    const product = productPages.find((item) => item.title === title);
    return product ? `/${product.slug}` : "/our-products";
  };

  const agroProducts = [
    "Fresh Vegetables",
    "Fresh Fruits",
    "Dry Fruits",
    "Grains & Pulses",
    "Indian Spices",
    "Namkeen"
  ];
  const otherProducts = [
    "Handicraft Products",
    "Copper Articles",
    "Steel Copper Utensils",
    "Furniture",
    "Garments",
    "Bedsheet"
  ];

  const isServiceActive = serviceSummaries.some((s) => pathname === `/${s.slug}`);
  const isProductActive =
    pathname === "/our-products" ||
    productPages.some((p) => pathname === `/${p.slug}`);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProductsOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (menuOpen) {
      setServicesOpen(false);
      setProductsOpen(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-lock", menuOpen);

    return () => {
      document.body.classList.remove("mobile-menu-lock");
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="top-strip">
          <div className="container top-strip__inner">
            <span>
              <MapPin size={15} aria-hidden="true" />
              {companySettings.location}
            </span>
            <span>
              <Mail size={15} aria-hidden="true" />
              {companySettings.email}
            </span>
            <a href={`tel:${companySettings.phonePrimary.replace(/\s/g, "")}`}>
              <Phone size={15} aria-hidden="true" />
              {companySettings.phonePrimary}
            </a>
          </div>
        </div>

        <nav className="container navbar" aria-label="Main navigation">
          <Link className="brand" href="/" aria-label="New Radhey Enterprises home" onClick={closeMenu}>
            <Image
              src={companySettings.logo}
              alt="New Radhey Enterprises"
              width={800}
              height={258}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links">
            <Link href="/" className={isActive("/") ? "nav-link-active" : ""}>
              Home
            </Link>
            <Link href="/about-us" className={isActive("/about-us") ? "nav-link-active" : ""}>
              About Us
            </Link>
            <div className="nav-dropdown">
              <Link href="/services" className={isActive("/services") || isServiceActive ? "nav-link-active" : ""}>
                Services
                <ChevronDown size={15} aria-hidden="true" />
              </Link>
              <div className="nav-dropdown__menu">
                {serviceSummaries.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    className={pathname === `/${service.slug}` ? "active" : ""}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/rice" className={isActive("/rice") ? "nav-link-active" : ""}>
              Rice
            </Link>
            <div className="nav-dropdown">
              <Link href="/our-products" className={isProductActive ? "nav-link-active" : ""}>
                Our Products
                <ChevronDown size={15} aria-hidden="true" />
              </Link>
              <div className="nav-dropdown__menu nav-products-mega">
                <div className="nav-products-mega__left">
                  <span className="nav-products-mega__parent">
                    Agro Products
                    <ChevronRight size={18} aria-hidden="true" />
                  </span>
                  {otherProducts.map((product) => (
                    <Link key={product} href={productHref(product)}>
                      {product}
                    </Link>
                  ))}
                </div>
                <div className="nav-products-mega__right">
                  {agroProducts.map((product) => (
                    <Link key={product} href={productHref(product)}>
                      {product}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/contact-us" className={isActive("/contact-us") ? "nav-link-active" : ""}>
              Contact Us
            </Link>
          </div>

          <Link className="nav-cta" href="/contact-us">
            Get Quote
            <Phone size={18} aria-hidden="true" />
          </Link>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {menuOpen
              ? <X size={24} aria-hidden="true" />
              : <Menu size={24} aria-hidden="true" />
            }
          </button>
        </nav>
      </header>

      {/*
        ⚠️ The mobile overlay + drawer are SIBLINGS of <header>, NOT children.
        This is intentional: the header has backdrop-filter which creates a
        new stacking context, trapping position:fixed children inside it.
        Placing the drawer outside fixes that entirely.
      */}

      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Slide-in drawer */}
      <div
        className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="mobile-menu__head">
          <Image
            src={companySettings.logo}
            alt="New Radhey Enterprises"
            width={800}
            height={258}
          />
          <button type="button" aria-label="Close menu" onClick={closeMenu}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="mobile-menu__inner">
          <Link
            href="/"
            className={`mobile-link${isActive("/") ? " mobile-link--active" : ""}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            href="/about-us"
            className={`mobile-link${isActive("/about-us") ? " mobile-link--active" : ""}`}
            onClick={closeMenu}
          >
            About Us
          </Link>

          {/* Services accordion */}
          <button
            className={`mobile-link mobile-link--toggle${
              isActive("/services") || isServiceActive ? " mobile-link--active" : ""
            }`}
            onClick={() => setServicesOpen((p) => !p)}
          >
            Services
            <ChevronDown
              size={16}
              className={`mobile-chevron${servicesOpen ? " mobile-chevron--open" : ""}`}
            />
          </button>
          {servicesOpen && (
            <div className="mobile-submenu">
              <Link href="/services" className="mobile-sublink" onClick={closeMenu}>
                All Services
              </Link>
              {serviceSummaries.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className={`mobile-sublink${
                    pathname === `/${service.slug}` ? " mobile-sublink--active" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/rice"
            className={`mobile-link${isActive("/rice") ? " mobile-link--active" : ""}`}
            onClick={closeMenu}
          >
            Rice
          </Link>

          {/* Products accordion */}
          <button
            className={`mobile-link mobile-link--toggle${
              isProductActive ? " mobile-link--active" : ""
            }`}
            onClick={() => setProductsOpen((p) => !p)}
          >
            Our Products
            <ChevronDown
              size={16}
              className={`mobile-chevron${productsOpen ? " mobile-chevron--open" : ""}`}
            />
          </button>
          {productsOpen && (
            <div className="mobile-submenu">
              <Link href="/our-products" className="mobile-sublink" onClick={closeMenu}>
                All Products
              </Link>
              {[...agroProducts, ...otherProducts].map((product) => (
                <Link
                  key={product}
                  href={productHref(product)}
                  className="mobile-sublink"
                  onClick={closeMenu}
                >
                  {product}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/contact-us"
            className={`mobile-link${isActive("/contact-us") ? " mobile-link--active" : ""}`}
            onClick={closeMenu}
          >
            Contact Us
          </Link>

          <Link
            className="button button--primary mobile-menu__cta"
            href="/contact-us"
            onClick={closeMenu}
          >
            Get A Quote
            <Phone size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
