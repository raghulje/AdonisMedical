import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const AwardsPage = lazy(() => import('../pages/awards/page'));
const InvestorRelationsPage = lazy(() => import('../pages/investor-relations/page'));
const CareersPage = lazy(() => import('../pages/careers/page'));
const SpecialtiesPage = lazy(() => import('../pages/specialties/page'));
const ManagementPage = lazy(() => import('../pages/management/page'));
const OurPresencePage = lazy(() => import('../pages/our-presence/page'));
const ProductionFacilityPage = lazy(() => import('../pages/production-facility/page'));
const QualityAssurancePage = lazy(() => import('../pages/quality-assurance/page'));
const HFMobilePage = lazy(() => import('../pages/products/hf-mobile/page'));
const RequestDemoPage = lazy(() => import('../pages/request-demo/page'));
const ContactUsPage = lazy(() => import('../pages/contact-us/page'));
const ClientsPage = lazy(() => import('../pages/clients/page'));
const DreamSeriesCeilingSuspended = lazy(() => import('../pages/products/dream-series-ceiling-suspended/page'));
const DigitalRadiography = lazy(() => import('../pages/products/digital-radiography/page'));
const LineFrequencyXRaySystems = lazy(() => import('../pages/products/line-frequency-x-ray-systems/page'));
const HighEndHFCArm = lazy(() => import('../pages/products/1k1k-high-end-hf-c-arm/page'));
const FPDCArm = lazy(() => import('../pages/products/fpd-c-arm/page'));
const HFFixed = lazy(() => import('../pages/products/hf-fixed/page'));
const OurProductsPage = lazy(() => import('../pages/our-products/page'));
const TermsAndConditionsPage = lazy(() => import('../pages/terms-and-conditions/page'));
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy/page'));
const FaqsPage = lazy(() => import('../pages/faqs/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/awards',
    element: <AwardsPage />,
  },
  {
    path: '/investor-relations',
    element: <InvestorRelationsPage />,
  },
  {
    path: '/careers',
    element: <CareersPage />,
  },
  {
    path: '/specialties',
    element: <SpecialtiesPage />,
  },
  {
    path: '/management',
    element: <ManagementPage />,
  },
  {
    path: '/our-presence',
    element: <OurPresencePage />,
  },
  {
    path: '/production-facility',
    element: <ProductionFacilityPage />,
  },
  {
    path: '/quality-assurance',
    element: <QualityAssurancePage />,
  },
  {
    path: '/products/hf-mobile',
    element: <HFMobilePage />,
  },
  {
    path: '/products/1k1k-high-end-hf-c-arm',
    element: <HighEndHFCArm />,
  },
  {
    path: '/products/fpd-c-arm',
    element: <FPDCArm />,
  },
  {
    path: '/products/hf-fixed',
    element: <HFFixed />,
  },
  {
    path: '/request-demo',
    element: <RequestDemoPage />,
  },
  {
    path: '/contact-us',
    element: <ContactUsPage />
  },
  {
    path: '/clients',
    element: <ClientsPage />
  },
  {
    path: '/products/dream-series-ceiling-suspended',
    element: <DreamSeriesCeilingSuspended />
  },
  {
    path: '/products/digital-radiography',
    element: <DigitalRadiography />
  },
  {
    path: '/products/line-frequency-x-ray-systems',
    element: <LineFrequencyXRaySystems />
  },
  {
    path: '/our-products',
    element: <OurProductsPage />
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditionsPage />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyPage />
  },
  {
    path: '/faqs',
    element: <FaqsPage />
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <AdminDashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
